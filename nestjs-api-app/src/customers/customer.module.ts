import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entities/customers.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}