import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customers } from "src/customers/entities/customers.entity";
import { CustomerType } from "src/products/enum/service-type";
import { Repository } from "typeorm";
import { CreateOrder } from "./dto/OrderDto";
import { ProductOrderService } from "src/productOrderService/productOrder.service";
import { OrderSummaryService } from "src/orderSummary/orderSummary.service";
import { Orders } from "./entities/orders.entity";
import { Product_order } from "src/productOrderService/entities/products_orders.entity";


@Injectable()
export class orderServices {
  constructor(
    @InjectRepository(Orders)
    private readonly orderRepository: Repository<Orders>,
    @InjectRepository(Product_order)
    private readonly productOrderRepository: Repository<Product_order>,
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    private readonly productOrderService: ProductOrderService,
    private readonly orderSummaryService: OrderSummaryService,
  ) { }

  async addOrder(createOrder: CreateOrder): Promise<Orders> {
    if (!createOrder.prdItem || createOrder.prdItem.length === 0) {
      throw new BadRequestException('prdItem must contain at least one product');
    }
    if (!createOrder.customerId && !createOrder.Cname) {
      throw new BadRequestException('Either customerId or customerName must be provided');
    }
    if (!createOrder.userId) {
      throw new BadRequestException('UserId not found');
    }

    let savedOrder: Orders;

    // Tạo đơn hàng và lưu vào cơ sở dữ liệu
    if (createOrder.customerId) {
      const customer = await this.customerRepository.findOne({ where: { id: createOrder.customerId } });
      if (!customer) {
        throw new NotFoundException(`Customer not found with id ${createOrder.customerId}`);
      }
      const newOrder = await this.orderRepository.create({
        customer,
        user: { id: createOrder.userId } as any,
        type: customer.customerType,
      });
      savedOrder = await this.orderRepository.save(newOrder);
    } else if (createOrder.Cname) {
      const newOrder = this.orderRepository.create({
        customerName: createOrder.Cname,
        user: { id: createOrder.userId } as any,
        type: CustomerType.Retail,
      });
      savedOrder = await this.orderRepository.save(newOrder);
    }

    // Sử dụng ProductOrderService để xử lý sản phẩm và đơn hàng
    const totalAmount = await this.productOrderService.processProductOrders(createOrder.prdItem, savedOrder);

    // Áp dụng chiết khấu cho tổng hóa đơn
    const discount = createOrder.discount || 0;
    const finalAmount = totalAmount - discount;
    if (finalAmount < 0) {
      finalAmount == 0; // Đảm bảo tổng tiền không âm
    }

    // Sử dụng OrderSummaryService để lưu tổng giá tiền vào bảng OrderSummary
    await this.orderSummaryService.createOrderSummary(savedOrder, finalAmount, discount, createOrder.PaymentStatus);

    // Trả về đơn hàng đã lưu
    return savedOrder;
  }

  async getAllOrdersWithProducts(customerId: string) {
    const customerOrders = await this.orderRepository.find({
      where: { customer: { id: customerId } },
    });
        return customerOrders;
  }
}