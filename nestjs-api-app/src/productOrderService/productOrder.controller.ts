import { Controller } from "@nestjs/common";
import { ProductOrderService } from "./productOrder.service";


@Controller('arderDummary')
export class OrderController {
    constructor(private productOrderService : ProductOrderService){}
    
}