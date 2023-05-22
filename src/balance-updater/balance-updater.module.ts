import { Module } from '@nestjs/common';
import { BalanceUpdaterService } from './balance-updater.service';
import { BalanceUpdaterController } from './balance-updater.controller';
import { BalanceModule } from '../balance/balance.module';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { BalanceCalculatorModule } from '../balance-calculator/balance-calculator.module';

@Module({
  imports: [BalanceModule, ExchangeRateModule, BalanceCalculatorModule],
  providers: [BalanceUpdaterService],
  controllers: [BalanceUpdaterController],
})
export class BalanceUpdaterModule {}
