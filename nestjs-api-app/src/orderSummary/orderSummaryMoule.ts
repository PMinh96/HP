import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSummary } from './entities/OrderSummary';
import { OrderSummaryService } from './orderSummary.service';
import { OrderSummaryController } from './orderSummary.controller';


@Module({
  imports: [TypeOrmModule.forFeature([OrderSummary])],
  providers: [OrderSummaryService],
  controllers: [OrderSummaryController],
  exports: [OrderSummaryService],
})
export class OrderSummaryModule {}
