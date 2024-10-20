import { Body, Controller, Delete, Get, Patch, Post, Query } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { Customers } from "./entities/customers.entity";
import { CreateCustomer } from "./customerDto/customerDto";
import { ApiResponse } from "src/commons/api-response";
import { ApiTags } from "@nestjs/swagger";
import { PaginationOptions } from "src/helper/pagination.helper";

@ApiTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerServices: CustomerService) {}

   @Post('/')
   async create(@Body() createCustomer: CreateCustomer) {
     const customer = await this.customerServices.createCustomer(createCustomer)
     return ApiResponse.success('Success', customer)
    }

    @Get('/')
    async get(
    @Query('search') search : string,
    @Query('page') page: number,
    @Query('limit') limit: number){
      const options: PaginationOptions = {
        page: page,
        limit: limit
      };
      // const customer = await this.customerServices.getCustomers(search, options)
      const customer = await this.customerServices.findAll(search, options)
      return ApiResponse.success('Success', customer)
    }
    @Delete('/')
    remove(@Query('customer-id') customer : string){
      const Dcustomer = this.customerServices.deleteCustomer(customer)
      return ApiResponse.success('Success', Dcustomer)
    }

    @Patch('/update')
    update(@Query('customer-id') customer : string,  ){

    }
}