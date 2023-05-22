import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { PrismaModule } from '../prisma/prisma.module';
import { IBalanceService } from '../core/abstracts/balance-service';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: IBalanceService,
      useClass: BalanceService,
    },
  ],
  exports: [IBalanceService],
})
export class BalanceModule {}
