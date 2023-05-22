import { ConflictException, Injectable } from '@nestjs/common';
import { Balance, ExchangeRate } from '../core/entities';
import { IBalanceService } from '../core/abstracts/balance-service';
import { IExchangeRateService } from '../core/abstracts/exchange-rate-service';
import { IBalanceCalculatorService } from '../core/abstracts/balance-calculator-service';
const RATE_NOT_FOUND = 'rate not found';

@Injectable()
export class BalanceUpdaterService {
  constructor(
    private balanceService: IBalanceService,
    private exchangeRateService: IExchangeRateService,
    private balanceCalculator: IBalanceCalculatorService,
  ) {}

  rates: Record<string, string> = {};

  async updateRates(): Promise<void> {
    const ratesFromDB: ExchangeRate[] = await this.exchangeRateService.getAll();
    for (const rateInstance of ratesFromDB) {
      this.rates[rateInstance.pair] = rateInstance.rate;
    }
  }

  async update(): Promise<void> {
    await this.updateRates();
    const balances: Balance[] = await this.balanceService.getAll();
    for (const balance of balances) {
      const pair: string = `${balance.cryptoAsset}/${balance.fiatCurrency}`;
      const rate = this.rates[pair];
      if (!rate) {
        throw new ConflictException(RATE_NOT_FOUND);
      }

      const updatedFiatBalance = this.balanceCalculator.calculateFiatBalance(
        balance.cryptoBalance,
        rate,
      );
      console.log({ updatedFiatBalance });

      await this.balanceService.update(balance.id, {
        fiatBalance: updatedFiatBalance,
      });
    }
  }
}
