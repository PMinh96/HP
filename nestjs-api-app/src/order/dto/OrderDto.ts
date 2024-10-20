import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentStatus } from 'src/products/enum/service-type';

export class CreateOrder {
  @ApiProperty({
    description: 'List of product IDs',
    example: ['d2e516be-0d86-4691-b5a0-fd5303c41ec3', 'prod2', 'prod3'],
  })
  prdItem: string[];

  @ApiPropertyOptional({
    description: 'ID of the customer',
    example: '0b7ec7c1-738d-4ce1-aa7f-490c74422ea5',
  })
  customerId?: string;

  @ApiProperty({
    description: 'ID of the user creating the order',
    example: 'a7827264-a0aa-47db-abd0-4905caadaf54',
  })
  userId: string;

  @ApiPropertyOptional({
    description: 'Name of the customer',
    example: 'John Doe',
  })
  Cname?: string;

  @ApiPropertyOptional({
    description: 'Discount applied to the total amount of the order',
    example: 10.00,
  })
  discount?: number;

  PaymentStatus: PaymentStatus;
}