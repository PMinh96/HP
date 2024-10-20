import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Sample Product' })
  name: string;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty({ example: 50 })
  stockQuantity: number;

  @ApiProperty({ example: 80 })
  importPrice: number;

  @ApiProperty({ example: 10, required: false })
  discount?: number;

  @ApiProperty({ example: 'uuid-of-discount-type', required: false })
  typeId?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}