// import { Author, Book, Genre } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';
import { Balance, ExchangeRate } from '../entities';

export abstract class IDataServices {
  abstract balances: IGenericRepository<Balance>;

  abstract exchangeRates: IGenericRepository<ExchangeRate>;
}
