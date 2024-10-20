import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSummary } from 'src/orderSummary/entities/OrderSummary';
import { DebtSercive } from './debt.service';
import { DebtController } from './debt.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([OrderSummary]),
  ],
  controllers: [DebtController],
  providers: [DebtSercive],
})
export class OrderSummaryMoule {}
