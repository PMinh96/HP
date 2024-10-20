import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderSummary } from 'src/orderSummary/entities/OrderSummary';

import { DiscountTypeController } from './discountType.controller';
import { DiscountTypeService } from './discountType.service';
import { DiscountType } from './entities/discountType';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscountType]),
  ],
  controllers: [DiscountTypeController],
  providers: [DiscountTypeService],
})
export class DiscountTypeMoule {}
