
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Orders } from 'src/order/entities/orders.entity';

import { CustomerType } from 'src/products/enum/service-type';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Customers extends CommonEntity {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone_number: number;

    @OneToMany(() => Orders, order => order.customer)
    orders: Orders[];
    
    @Column()
    customerType: CustomerType;
}