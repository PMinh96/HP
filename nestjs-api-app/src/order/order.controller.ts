import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { orderServices } from "./order.service";
import { CreateOrder } from "./dto/OrderDto";

import { ApiTags } from "@nestjs/swagger";
import { Orders } from "./entities/orders.entity";
import { ApiResponse } from "src/commons/api-response";

@ApiTags('order')
@Controller('order')
export class orderController {
    constructor(private readonly orderServices: orderServices) {}

   @Post()
    async create(@Body() createUser: CreateOrder) {
      const object = this.orderServices.addOrder(createUser);
      return ApiResponse.success('Success', object)
    }
    @Get('/')
    async get(@Query('CustomerId') CustomerId : string) {
      const object = await this.orderServices.getAllOrdersWithProducts(CustomerId);
      return ApiResponse.success('Success', object)
    }
}