import { Module } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IExchangeRateService } from '../core/abstracts/exchange-rate-service';
import { ExchangeRateController } from './exchange-rate.controller';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IExchangeRateService,
      useClass: ExchangeRateService,
    },
  ],
  exports: [IExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
