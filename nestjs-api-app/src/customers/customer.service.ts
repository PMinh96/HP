import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Customers } from "./entities/customers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCustomer, UpdateCustomerDto } from "./customerDto/customerDto";
import { NotFoundError } from "rxjs";
import { paginate, PaginationOptions } from "src/helper/pagination.helper";

export interface PaginateOptions {
    page: number;
    limit: number;
}

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customers)
        private customerRepository: Repository<Customers>,
    ) { }
    async createCustomer(createCustomer: CreateCustomer) {
        const existingUserByEmail = await this.customerRepository.findOne({ where: { email: createCustomer.email } });
        if (existingUserByEmail) {
            throw new BadRequestException('Email already exists');
        }
        const existingUserByPhone = await this.customerRepository.findOne({ where: { phone_number: createCustomer.phone_number } });
        if (existingUserByPhone) {
            throw new BadRequestException('Phone number already exists');
        }
        const customer = this.customerRepository.create(createCustomer);
        await this.customerRepository.save(customer);
        return customer;
    }

    async findAll(search: string, options: PaginateOptions) {
        const queryBuilder = this.customerRepository.createQueryBuilder('customer');
        if (search) {
            queryBuilder.where('customer.name LIKE :search', { search: `%${search}%` });
        }

        if (options && options.page !== undefined && options.limit !== undefined) {
            queryBuilder
                .skip((options.page - 1) * options.limit)
                .take(options.limit);
        }
        const [customers, total] = await queryBuilder.getManyAndCount();
        return this.paginate(customers, total, options);
    }

    private paginate(items: any[], total: number, options: PaginateOptions) {
        return {
            items,
            meta: {
                totalItems: total,
                itemCount: items.length,
                itemsPerPage: options.limit,
                totalPages: Math.ceil(total / options.limit),
                currentPage: options.page,
            },
        };
    }

    async deleteCustomer(customerId: string) {
        const customer = await this.customerRepository.findOne({ where: { id: customerId } })
        if (customer) {
            return await this.customerRepository.softRemove(customer)
        }
        throw new NotFoundException('Customer not found')
    }
    async updateCustomer(customerId: string, updateCustomer: UpdateCustomerDto) {
        const customer = await this.customerRepository.findOne({ where: { id: customerId } })
        if (customer) {
            const updatedCustomer = {
                ...customer,
                ...updateCustomer
            };
            return await this.customerRepository.save(updatedCustomer);
        }
        throw new NotFoundException('Customer not found')
    }
}

