import { IGenericRepository } from './generic-repository.abstract';
import { ExchangeRate } from '../entities';
import { CryptoExchangeRatesRecord } from '../entities/crypto-exchange-rates-record';

export abstract class IExchangeRateService extends IGenericRepository<ExchangeRate> {
  abstract getExchangeRates(
    cryptoArray: string[],
    fiatArray: string[],
  ): Promise<CryptoExchangeRatesRecord>;
}
