import { Customers } from "./customers/entities/customers.entity";
import { Debt } from "./debt/entities/debt";
import { DiscountType } from "./discountType/entities/discountType";
import { Orders } from "./order/entities/orders.entity";
import { OrderSummary } from "./orderSummary/entities/OrderSummary";
import { Product_order } from "./productOrderService/entities/products_orders.entity";
import { Products } from "./products/entities/products.entity";
import { User } from "./user/entities/users.entity";
export const entities = [
    User, 
    Products, 
    Product_order, 
    Customers, 
    Orders, 
    OrderSummary,
    Debt,
    DiscountType

];