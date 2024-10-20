import { CommonEntity } from 'src/commons/entities/common.entity';
import { Orders } from 'src/order/entities/orders.entity';
import { PaymentStatus } from 'src/products/enum/service-type';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity({ name: 'order_summary' })
export class OrderSummary extends CommonEntity {
    @OneToOne(() => Orders)
    @JoinColumn()
    order: Orders;

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    totalAmount: number;

    @Column({ type: 'float', default: 0 })
    discount: number;

    @Column({ type: 'float', default: 0 })
    totalAfterDiscount: number;

    @Column()
    status: PaymentStatus;
}