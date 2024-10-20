import { CommonEntity } from 'src/commons/entities/common.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Orders } from '../../order/entities/orders.entity';
import { Products } from 'src/products/entities/products.entity';


@Entity({ name: 'product_order' })
export class Product_order extends CommonEntity {
    @ManyToOne(() => Products, (product) => product.productOrders, { eager: true })
    product: Products;

    @ManyToOne(() => Orders, (order) => order.productOrders, { eager: true })
    order: Orders;

    @Column()
    soldprice: number;

    @Column()
    soldDiscount: number;

    @Column()
    quantity: number;
}