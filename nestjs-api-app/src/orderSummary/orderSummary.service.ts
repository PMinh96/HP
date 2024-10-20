import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/order/entities/orders.entity";
import { OrderSummary } from "src/orderSummary/entities/OrderSummary";
import { PaymentStatus } from "src/products/enum/service-type";
import { Repository } from "typeorm";

@Injectable()
export class OrderSummaryService {
  constructor(
    @InjectRepository(OrderSummary)
    private readonly orderSummaryRepository: Repository<OrderSummary>,
  ) { }
  async createOrderSummary(savedOrder: Orders, totalAmount: number, discount: number, status: PaymentStatus): Promise<OrderSummary> {
    const orderSummary = await this.orderSummaryRepository.create({
      order: savedOrder,
      totalAmount,
      discount,
      status,
    });
    return await this.orderSummaryRepository.save(orderSummary);
  }
}