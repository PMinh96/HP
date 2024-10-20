import { BadRequestException, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { DiscountType } from "./entities/discountType";
import { DiscountTypeService } from "./discountType.service";
import { ApiResponse } from "src/commons/api-response";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('discount-types')
@Controller('discount-types')
export class DiscountTypeController {
    constructor(private readonly discountService: DiscountTypeService) { }

    @Post()
    async create(
      @Query('name') name: string,
    ): Promise<ApiResponse> {
      if (!name ) {
        throw new BadRequestException('Name and discount are required');
      }
      const object = await this.discountService.create(name);
      return ApiResponse.success('Success', object);
    }

    @Get()
    async getAll() {
        const object = await this.discountService.getAll();
        return ApiResponse.success('Success', object);
    }

    @Get('details')
    async getOne(@Query('id') id: string) {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
        const object = await this.discountService.getOne(id);
        return ApiResponse.success('Success', object);
    }

    @Put()
    async update(
        @Query('id') id: string,
        @Query('name') name: string,
    ) {
        if (!id || !name) {
            throw new BadRequestException('ID, name, and discount are required');
        }
        const object = await this.discountService.update(id, name);
        return ApiResponse.success('Success', object);
    }

    @Delete()
    async delete(@Query('id') id: string) {
        if (!id) {
            throw new BadRequestException('ID is required');
        }
         await this.discountService.delete(id);
        return ApiResponse.success('Success', id);
    }
}