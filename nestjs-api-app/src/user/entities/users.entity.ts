import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Orders } from 'src/order/entities/orders.entity';


@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Orders, order => order.user)
  orders: Orders[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
