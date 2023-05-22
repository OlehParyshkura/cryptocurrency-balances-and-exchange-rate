import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExchangeRate } from '../core/entities';
import { IExchangeRateService } from '../core/abstracts/exchange-rate-service';
import { CryptoExchangeRatesRecord } from '../core/entities/crypto-exchange-rates-record';

@Injectable()
export class ExchangeRateService implements IExchangeRateService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<ExchangeRate[]> {
    return this.prisma.exchangeRate.findMany();
  }

  getById(id: number): Promise<ExchangeRate | null> {
    return this.prisma.exchangeRate.findUnique({
      where: { id },
    });
  }

  getOneByFilter(filter: Partial<ExchangeRate>): Promise<ExchangeRate | null> {
    return this.prisma.exchangeRate.findFirst({ where: filter });
  }

  async create(item: ExchangeRate): Promise<ExchangeRate> {
    return await this.prisma.exchangeRate.create({
      data: item,
    });
  }

  update(id: number, item: Partial<ExchangeRate>): Promise<ExchangeRate> {
    return this.prisma.exchangeRate.update({
      where: { id },
      data: item,
    });
  }

  async getExchangeRates(
    cryptoArray: string[],
    fiatArray: string[],
  ): Promise<CryptoExchangeRatesRecord> {
    const exchangeRates: CryptoExchangeRatesRecord = {};

    for (const crypto of cryptoArray) {
      exchangeRates[crypto] = {};

      for (const fiat of fiatArray) {
        const pair = `${crypto}/${fiat}`;
        const exchangeRateInstance: ExchangeRate | null =
          await this.getOneByFilter({
            pair,
          });

        if (exchangeRateInstance?.rate) {
          exchangeRates[crypto][fiat] = exchangeRateInstance.rate;
        }
      }
    }

    return exchangeRates;
  }
}
