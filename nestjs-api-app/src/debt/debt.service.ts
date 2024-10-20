import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderSummary } from "src/orderSummary/entities/OrderSummary";
import { Repository } from "typeorm";

@Injectable()
export class DebtSercive {
    constructor(
        @InjectRepository(OrderSummary)
        private orderSummary : Repository<OrderSummary>
    ){}

}