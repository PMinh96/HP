import { Body, Controller, Post } from "@nestjs/common";
import { OrderSummaryService } from "./orderSummary.service";
import { Orders } from "src/order/entities/orders.entity";
import { PaymentStatus } from "src/products/enum/service-type";


@Controller('orderSummary')
export class OrderSummaryController {
    constructor(private orderSummarySercive : OrderSummaryService){}
    
    @Post('/')
    async create (@Body() savedOrder: Orders, totalAmount: number, discount: number, status: PaymentStatus){
        return await this.orderSummarySercive.createOrderSummary(savedOrder, totalAmount, discount, status)
    }
}