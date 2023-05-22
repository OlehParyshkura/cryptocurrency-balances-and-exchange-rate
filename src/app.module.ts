import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { KrakenModule } from './kraken/kraken.module';
import { BalanceModule } from './balance/balance.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { BalanceUpdaterModule } from './balance-updater/balance-updater.module';
import { BalanceCalculatorModule } from './balance-calculator/balance-calculator.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    KrakenModule,
    BalanceModule,
    ExchangeRateModule,
    BalanceUpdaterModule,
    BalanceCalculatorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
