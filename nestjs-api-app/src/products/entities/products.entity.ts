import { CommonEntity } from 'src/commons/entities/common.entity';
import { DiscountType } from 'src/discountType/entities/discountType';
import { Product_order } from 'src/productOrderService/entities/products_orders.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ProductUnit } from '../enum/service-type';

@Entity({ name: 'products' })
export class Products extends CommonEntity {
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    stockQuantity: number;

    @Column()
    unit: ProductUnit;

    @Column()
    importPrice: number;

    @Column({ type: 'uuid', nullable: true })
    typeId: string;

    @ManyToOne(() => DiscountType, discountType => discountType.products)
    @JoinColumn({ name: 'typeId' })
    discountType: DiscountType;

    @OneToMany(() => Product_order, (productOrder) => productOrder.product, {
        cascade: true,
    })
    productOrders: Product_order[];

    @Column({ type: 'float', default: 0 })
    discount: number;
}
