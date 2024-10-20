import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/products.entity';
import { In, Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/insert.product.dto';
import { ApiResponse } from 'src/commons/api-response';
import { DiscountType } from 'src/discountType/entities/discountType';

export interface PaginateOptions {
    page: number;
    limit: number;
}
@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
        @InjectRepository(DiscountType)
        private discountTypeRepository: Repository<DiscountType>,
    ) { }

    async create(createProductDto: CreateProductDto) {
        if (createProductDto.stockQuantity < 0 || createProductDto.price < 0) {
            return ApiResponse.error("Cannot be less than 0", 400, createProductDto.stockQuantity);
        }
    
        const newProduct = this.productsRepository.create({
            ...createProductDto,
            typeId: createProductDto.typeId, // Lưu ID của DiscountType
        });
    
        const savedProduct = await this.productsRepository.save(newProduct);
        return ApiResponse.success('sucess',savedProduct);
    }
    async getProducts(keyWord: string, options: PaginateOptions) {
        const query = this.productsRepository.createQueryBuilder('product');
    
        if (keyWord && keyWord.trim() !== '' && keyWord.trim() !== "undefined") {
            query.andWhere('product.name LIKE :keyword', { keyword: `%${keyWord}%` });
        }
        if (options && options.page !== undefined && options.limit !== undefined) {
            query
                .skip((options.page - 1) * options.limit)
                .take(options.limit);
        }
    
        const [products, total] = await query.getManyAndCount();
        const typeIds = products.map(product => product.typeId).filter(typeId => typeId);
    
        // Lấy thông tin loại giảm giá cho các sản phẩm
        const discountTypes = await this.discountTypeRepository.findByIds(typeIds);
        const discountTypeMap = discountTypes.reduce((map, discountType) => {
            map[discountType.id] = discountType;
            return map;
        }, {} as Record<string, DiscountType>);
    
        // Thêm loại giảm giá vào từng sản phẩm
        const productsWithDiscounts = products.map(product => ({
            ...product,
            typeName: discountTypeMap[product.typeId]?.name || null,
            discountTypeId: discountTypeMap[product.typeId]?.id || null,
        }));
    
        return this.paginate(productsWithDiscounts, total, options);
    }

    private paginate(items: any[], total: number, options: PaginateOptions) {
        return {
            items,
            meta: {
                totalItems: total,
                itemCount: items.length,
                itemsPerPage: options.limit,
                totalPages: Math.ceil(total / options.limit),
                currentPage: options.page,
            },
        };
    }

    async update(updateProductDto: UpdateProductDto, id: string) {
        const checkProduct = await this.productsRepository.findOne({ where: { id }});
        if (!checkProduct) {
            throw new NotFoundException(`Product not found, ${id}`);
        }
        const updatedProduct = await this.productsRepository.save({
            ...checkProduct,
            ...updateProductDto,
        });

        return updatedProduct;
    }

    async delete(id: string) {
        const checkProduct = await this.productsRepository.findOne({ where: { id }});
        if (!checkProduct) {
            throw new NotFoundException(`Product not found, ${id}`);
        }
        return await this.productsRepository.softDelete(id);
    }

    async detail(id: string) { 
        const checkProduct = await this.productsRepository.findOne({ where: { id }});
        if (!checkProduct) {
            throw new NotFoundException(`Product not found, ${id}`);
        }
        return checkProduct
    }
}

