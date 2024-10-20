import { Module } from '@nestjs/common';
import { orderController } from './order.controller';
import { orderServices } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customers } from 'src/customers/entities/customers.entity';
import { ProductOrderService } from 'src/productOrderService/productOrder.service';
import { OrderSummaryService } from 'src/orderSummary/orderSummary.service';
import { OrderSummary } from 'src/orderSummary/entities/OrderSummary';
import { User } from 'src/user/entities/users.entity';
import { Orders } from './entities/orders.entity';
import { Product_order } from 'src/productOrderService/entities/products_orders.entity';
import { Products } from 'src/products/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderSummary, Product_order, Products, Customers, User]),
  ],
  controllers: [orderController],
  providers: [orderServices, ProductOrderService, OrderSummaryService],
})
export class OrderModule {}