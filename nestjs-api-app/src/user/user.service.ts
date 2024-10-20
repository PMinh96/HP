import { BadRequestException, ForbiddenException, Injectable, NotFoundException, Query, Request } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from "./dto/UsersDTO";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        await user.hashPassword();
        return this.userRepository.save(user);
      }
}

