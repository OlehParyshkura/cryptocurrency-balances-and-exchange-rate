import { Module } from '@nestjs/common';
import { BalanceCalculatorService } from './balance-calculator.service';
import { IBalanceCalculatorService } from '../core/abstracts/balance-calculator-service';

@Module({
  providers: [
    {
      provide: IBalanceCalculatorService,
      useClass: BalanceCalculatorService,
    },
  ],
  exports: [IBalanceCalculatorService],
})
export class BalanceCalculatorModule {}
