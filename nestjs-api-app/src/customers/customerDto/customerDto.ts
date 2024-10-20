import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CustomerType } from 'src/products/enum/service-type'; // Điều chỉnh đường dẫn theo cấu trúc dự án của bạn
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomer {
    @ApiProperty({
        description: 'Name of the customer',
        example: 'John Doe',
    })
    name: string;

    @ApiPropertyOptional({
        description: 'Email address of the customer',
        example: 'customer@example.com',
    })
    email?: string;

    @ApiPropertyOptional({
        description: 'Phone number of the customer',
        example: 1234567890,
    })
    phone_number?: number;

    @ApiPropertyOptional({
        description: 'Type of the customer',
        enum: CustomerType,
        example: CustomerType.Retail,
    })
    customerType?: CustomerType;
}

export class UpdateCustomerDto extends PartialType (CreateCustomer) {}