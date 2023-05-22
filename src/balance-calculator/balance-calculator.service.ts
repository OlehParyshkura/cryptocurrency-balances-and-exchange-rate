import { Injectable } from '@nestjs/common';
import Decimal from 'decimal.js';
import { IBalanceCalculatorService } from '../core/abstracts/balance-calculator-service';

@Injectable()
export class BalanceCalculatorService implements IBalanceCalculatorService {
  calculateFiatBalance(cryptoBalance: string, rate: string): string {
    const decimalCryptoBalance: Decimal = new Decimal(cryptoBalance);
    const decimalRate: Decimal = new Decimal(rate);

    const fiatBalance = decimalCryptoBalance.times(decimalRate);

    return fiatBalance.toString();
  }
}
