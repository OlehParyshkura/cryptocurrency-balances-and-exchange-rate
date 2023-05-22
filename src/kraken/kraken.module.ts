import { Module } from '@nestjs/common';
import { KrakenService } from './kraken.service';
import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';

@Module({
  imports: [ExchangeRateModule],
  providers: [KrakenService],
})
export class KrakenModule {}
