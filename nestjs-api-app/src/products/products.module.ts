import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { Orders } from '../order/entities/orders.entity';
import { Product_order } from 'src/productOrderService/entities/products_orders.entity';
import { DiscountType } from 'src/discountType/entities/discountType';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Orders, Product_order, DiscountType]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}