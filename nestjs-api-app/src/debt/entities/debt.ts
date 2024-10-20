import { CommonEntity } from 'src/commons/entities/common.entity';
import { OrderSummary } from 'src/orderSummary/entities/OrderSummary';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class Debt extends CommonEntity{

  @OneToOne(() => OrderSummary)
  @JoinColumn()
  orderSummary: OrderSummary;

  @Column({ type: 'float', default: 0 })
  amountPaid: number; // Số tiền đã thanh toán

  @Column({ type: 'float', default: 0 })
  amountDue: number; // Số tiền còn nợ
}