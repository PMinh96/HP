export class FillterUserDto{
    page: string;
    items_per_page: string;
    search: string
}

import { IsBoolean } from 'class-validator';

export class UserSelectDto {
  @IsBoolean()
  readonly id: true;

  @IsBoolean()
  readonly email: true;

  @IsBoolean()
  readonly firstName: true;

  @IsBoolean()
  readonly lastName: true;

  @IsBoolean()
  readonly createdAt: true;

  @IsBoolean()
  readonly updatedAt: true;

  @IsBoolean()
  readonly role: true;

  @IsBoolean()
  readonly avata: true;
}