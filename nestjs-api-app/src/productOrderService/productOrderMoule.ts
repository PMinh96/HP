import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/products/products.controller';
import { ProductService } from 'src/products/products.service';
import { Product_order } from './entities/products_orders.entity';
import { Products } from 'src/products/entities/products.entity';
import { DiscountType } from 'src/discountType/entities/discountType';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product_order,Products, DiscountType]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductOrderModule {}
