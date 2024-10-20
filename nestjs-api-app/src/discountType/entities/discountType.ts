import { UUID } from 'crypto';
import { CommonEntity } from 'src/commons/entities/common.entity';
import { Products } from 'src/products/entities/products.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class DiscountType extends CommonEntity  {
  @Column()
  name: string;
  @OneToMany(() => Products, product => product.typeId)
  products: Products[];
}
