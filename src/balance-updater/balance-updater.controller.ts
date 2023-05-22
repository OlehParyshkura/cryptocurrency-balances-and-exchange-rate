import { Cron, CronExpression } from '@nestjs/schedule';
import { BalanceUpdaterService } from './balance-updater.service';
import { Controller } from '@nestjs/common';

@Controller()
export class BalanceUpdaterController {
  constructor(private updaterService: BalanceUpdaterService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async update(): Promise<void> {
    await this.updaterService.update();
  }
}
