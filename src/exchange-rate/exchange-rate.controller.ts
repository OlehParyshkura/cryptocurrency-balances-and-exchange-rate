import { Controller, Get, Query } from '@nestjs/common';

import { CryptoExchangeRatesRecord } from '../core/entities/crypto-exchange-rates-record';
import { IExchangeRateService } from '../core/abstracts/exchange-rate-service';

@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: IExchangeRateService) {}

  @Get()
  async getExchangeRates(
    @Query('cryptocurrencies') cryptocurrencies: string,
    @Query('fiatCurrencies') fiatCurrencies: string,
  ): Promise<CryptoExchangeRatesRecord> {
    const cryptoArray: string[] = cryptocurrencies.split(',');
    const fiatArray: string[] = fiatCurrencies.split(',');

    return this.exchangeRateService.getExchangeRates(cryptoArray, fiatArray);
  }
}
