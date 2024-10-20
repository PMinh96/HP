import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { DiscountType } from "./entities/discountType";

@Injectable()
export class DiscountTypeService {
    constructor(
        @InjectRepository(DiscountType)
        private discountTypeRepository: Repository<DiscountType>
    ) { }
    async create(name: string): Promise<DiscountType> {
        const existingDiscountType = await this.discountTypeRepository.findOne({ where: { name } });
        if (existingDiscountType) {
          throw new ConflictException(`Discount type with name ${name} already exists`);
        }
    
        const newDiscountType = this.discountTypeRepository.create({ name });
        return await this.discountTypeRepository.save(newDiscountType);
      }
    async getOne(id: string) {
        const object = await this.discountTypeRepository.findOne({ where: { id } });
        if (!object) {
            throw new NotFoundException(`Discount type with ID ${id} not found`);
        }
        return object;
    }
    async getAll() {
        return await this.discountTypeRepository.find()
    }
    async update(id: string, name: string): Promise<DiscountType> {
        const object = await this.getOne(id);
        if (object) {
            object.name = name;
            return await this.discountTypeRepository.save(object);
        } else {
            throw new NotFoundException(`Discount type with ID ${id} not found`);
        }
    }
    async delete(id: string) {
        const object = await this.getOne(id)
        if (object) {
            return await this.discountTypeRepository.delete(object.id)
        }
    }
}