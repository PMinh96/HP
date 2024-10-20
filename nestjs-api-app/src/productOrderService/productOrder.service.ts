import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/products.entity';
import { Product_order } from './entities/products_orders.entity';
import { Orders } from 'src/order/entities/orders.entity';


@Injectable()
export class ProductOrderService {
  constructor(
    @InjectRepository(Product_order)
    private readonly productOrderRepository: Repository<Product_order>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async processProductOrders(prdItem: string[], savedOrder: Orders): Promise<number> {
    const products = await this.productRepository.findByIds(prdItem);
    if (products.length !== prdItem.length) {
      throw new NotFoundException('One or more products not found');
    }

    let totalAmount = 0;
    const productOrders = products.map(product => {
      const quantity = 1; // Điều chỉnh số lượng nếu cần
      const price = product.price; // Giả sử `product` có thuộc tính `prices
      totalAmount += price * quantity;
      return this.productOrderRepository.create({
        order: savedOrder,
        product,
        quantity,
        soldprice: product.price,
        soldDiscount: product.discount
      });
    });

    await this.productOrderRepository.save(productOrders);
    return totalAmount;
  }
}
