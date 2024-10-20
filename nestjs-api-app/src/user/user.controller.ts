import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/UsersDTO';
import { User } from './entities/users.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


// @UseGuards(MyJwtGuard)
@ApiTags('users')
@Controller('user')
export class UsersController {
    constructor(private readonly userService: UserService) {}
  
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
    }
}