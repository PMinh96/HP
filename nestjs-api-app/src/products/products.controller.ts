import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { ProductService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/insert.product.dto';
import { ApiResponse } from 'src/commons/api-response';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from 'src/helper/pagination.helper';


// @UseGuards(MyJwtGuard)
@ApiTags('product')
@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) { }

	@Post('/create')
	async create(@Body() createProductDto: CreateProductDto) {
		const create = await this.productService.create(createProductDto)
		return ApiResponse.success('Success', create)
	}

	@Get('/')
	async GetProducts(
		@Query('key-Word') keyWord?: string,
		@Query('page') page?: number,
		@Query('limit') limit?: number){
		  const options: PaginationOptions = {
			page: page,
			limit: limit
		  };
		const productList = await this.productService.getProducts(keyWord, options)
		return ApiResponse.success('Success', productList)
	}

	@Delete('/')
	async delete(@Query('id') id: string) {
		const softdelete = await this.productService.delete(id)
		return ApiResponse.success('Success', softdelete)
	}

	@Post('/update')
	async update(@Body() updateProductDto: UpdateProductDto, @Query('id') id: string) {
		const update = await this.productService.update(updateProductDto, id)
		return ApiResponse.success('Success', update)
	}

	@Get('detail')
	async detail(@Query('id') id: string) {
		const detail = await this.productService.detail(id)
		return ApiResponse.success('Success', detail)
	}

}
