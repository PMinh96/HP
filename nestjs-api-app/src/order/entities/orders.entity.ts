import { CommonEntity } from 'src/commons/entities/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { Customers } from 'src/customers/entities/customers.entity';
import { User } from 'src/user/entities/users.entity';
import { CustomerType } from '../../products/enum/service-type';
import { Product_order } from 'src/productOrderService/entities/products_orders.entity';

@Entity({ name: 'orders' })
export class Orders extends CommonEntity {
    @OneToMany(() => Product_order, (productOrder) => productOrder.order, {
        cascade: true,
    })
    productOrders: Product_order[];

    @ManyToOne(() => Customers, customer => customer.orders, { nullable: true })
    customer: Customers;

    @ManyToOne(() => User, user => user.orders)
    user: User;

    @Column({nullable: true})
    customerName: string;

    @Column()
    type: CustomerType;
}
