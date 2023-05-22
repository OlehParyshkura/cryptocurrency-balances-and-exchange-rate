import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Balance } from '../core/entities';
import { IBalanceService } from '../core/abstracts/balance-service';

@Injectable()
export class BalanceService implements IBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<Balance[]> {
    return this.prisma.balance.findMany();
  }

  getById(id: number): Promise<Balance | null> {
    return this.prisma.balance.findUniqueOrThrow({
      where: { id },
    });
  }

  getOneByFilter(filter: Partial<Balance>): Promise<Balance | null> {
    return this.prisma.balance.findFirst({ where: filter });
  }

  async create(item: Balance): Promise<Balance> {
    return await this.prisma.balance.create({
      data: item,
    });
  }

  update(id: number, item: Partial<Balance>): Promise<Balance> {
    return this.prisma.balance.update({
      where: { id },
      data: item,
    });
  }
}
