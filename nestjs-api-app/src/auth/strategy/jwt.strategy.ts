// // quanr lys rq can token

// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { User } from 'src/user/entities/users.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
//   constructor(
//     configService: ConfigService,
//     @InjectRepository(User)
//     private userRepository: Repository<User>
//   ) {
//   super({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: configService.get('JWT_SECRET'),
//   });
// }

//   async validate(payload: { sub: number; email: string }) {
//   // Use TypeORM to find user by ID
//   const userRepository = this.userRepository; // Assuming you have a userRepository in PrismaService

//   try {
//     const user = await userRepository.findOne({ where: { id: payload.sub } });

//     if (!user) {
//       throw new Error('User not found');
//     }

//     delete user.hashedPassword; // Remove sensitive information

//     return user;
//   } catch (error) {
//     throw new Error(`Unable to validate user: ${error.message}`);
//   }
// }
// }
