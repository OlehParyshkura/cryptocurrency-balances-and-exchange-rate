import { ConflictException, Injectable, OnModuleInit } from '@nestjs/common';
import * as WebSocket from 'ws';
import { TickerDataDto } from './dto/ticker-data.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ExchangeRate } from '../core/entities';
import { IExchangeRateService } from '../core/abstracts/exchange-rate-service';

const NOT_A_TICKER_MESSAGE = 'not a ticker message';
const PAIRS_TO_SUBSCRIBE = [
  'XBT/USD',
  'XBT/EUR',
  'XBT/CAD',
  'XBT/JPY',
  'XBT/GBP',
  'XBT/CHF',
  'XBT/AUD',
  'ETH/USD',
  'ETH/EUR',
  'ETH/CAD',
  'ETH/JPY',
  'ETH/GBP',
  'ETH/CHF',
  'ETH/AUD',
];

@Injectable()
export class KrakenService implements OnModuleInit {
  private ws: WebSocket;
  private readonly url: string = 'wss://ws.kraken.com';

  constructor(private exchangeRate: IExchangeRateService) {
    this.ws = new WebSocket(this.url);
  }

  onModuleInit(): void {
    this.ws.on('open', () => {
      this.subscribeToTickers(PAIRS_TO_SUBSCRIBE);
    });

    this.ws.on('message', (data) => {
      void this.messageListener(data);
    });

    this.ws.on('error', console.log);
  }

  messageListener = async (data: WebSocket.Data): Promise<void> => {
    try {
      const [tickerData, pair] = await this.validateMessageData(data);
      await this.processTickerData(tickerData, pair);
    } catch (error) {
      if (
        error instanceof ConflictException &&
        error.message === NOT_A_TICKER_MESSAGE
      ) {
        // ignore
      } else {
        console.log(error);
        throw error;
      }
    }
  };

  async validateMessageData(
    tickerData: WebSocket.Data,
  ): Promise<[TickerDataDto, string]> {
    const response: unknown = JSON.parse(tickerData.toString());
    if (
      Array.isArray(response) &&
      response[2] === 'ticker' &&
      typeof response[3] === 'string'
    ) {
      const pair: string = response[3];
      const tickerData: TickerDataDto = plainToInstance(
        TickerDataDto,
        response[1],
      );
      await validateOrReject(tickerData);
      return [tickerData, pair];
    } else {
      throw new ConflictException(NOT_A_TICKER_MESSAGE);
    }
  }

  subscribeToTickers(pairs: string[]): void {
    const payload = {
      event: 'subscribe',
      pair: pairs,
      subscription: {
        name: 'ticker',
      },
    };

    this.ws.send(JSON.stringify(payload));
  }

  async processTickerData(
    tickerData: TickerDataDto,
    pair: string,
  ): Promise<void> {
    const exchangeRate: ExchangeRate | null =
      await this.exchangeRate.getOneByFilter({
        pair,
      });

    const {
      c: [price],
    } = tickerData;

    const newExchangeRate: ExchangeRate = { pair, rate: price };

    if (exchangeRate) {
      await this.exchangeRate.update(exchangeRate.id, newExchangeRate);
    } else {
      await this.exchangeRate.create(newExchangeRate);
    }

    console.log(`Pair: ${pair}, price ${price}`);
  }
}
