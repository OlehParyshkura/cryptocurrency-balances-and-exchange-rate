import { IGenericRepository } from './generic-repository.abstract';
import { Balance } from '../entities';

export abstract class IBalanceService extends IGenericRepository<Balance> {}
