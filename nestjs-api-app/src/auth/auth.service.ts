// import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { User, Note } from '@prisma/client';
// import { PrismaService } from '../prisma/prisma.service';
// import * as argon from 'argon2';
// import { AuthDTO } from './dto';
// import { JwtService } from '@nestjs/jwt';
// import { promises } from 'dns';
// import { ConfigService } from '@nestjs/config';

// @Injectable({})
// export class AuthService {
//   constructor(
//     private prismaService: PrismaService,
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) { }
//   async regiter(authDTO: AuthDTO) {
//     const hashedPassWord = await argon.hash(authDTO.password);
//     try {
//       const user = await this.prismaService.user.create({
//         data: {
//           email: authDTO.email,
//           hashedPassword: hashedPassWord,
//           firstName: '',
//           lastName: '',
//           refresh_token: 'refresh_token'
//         },
//         select: {
//           id: true,
//           email: true,
//           createdAt: true,
//           updatedAt: true,
//           refresh_token: true,
//         },
//       });
//       return await this.signToJwtToken(user.id, user.email);
//     } catch (error) {
//       if (error.code == 'P2002') {
//         throw new ForbiddenException('trùng nhau');
//       }
//     }
//   }
  
//   async login(authDTO: AuthDTO) {
//     const user = await this.prismaService.user.findUnique({
//       where: {
//         email: authDTO.email,
//       },
//     });
//     if (!user) {
//       throw new ForbiddenException('user not found');
//     }
//     const passwordMatched = await argon.verify(
//       user.hashedPassword,
//       authDTO.password,
//     );
//     if (!passwordMatched) {
//       throw new ForbiddenException('incorrect password');
//     }
//     delete user.hashedPassword;
//     return await this.signToJwtToken(user.id, user.email);
//   }

//   async refreshToken(refresh_token: string): Promise<any> {
//     try {
//       const verify = await this.jwtService.verifyAsync(refresh_token, {
//         secret: this.configService.get('JWT_REFRESH_TOKEN'),
//       })
//       const checkExitToken = await this.prismaService.user.findUnique({
//         where: {
//           email: verify.email,
//           refresh_token,
//         }
//       })
//       if (checkExitToken) {
//         return this.signToJwtToken(verify.sub, verify.email);
//       } else {
//         throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
//       }
//     } catch (error) {
//       throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST)
//     }
//   }

//   async signToJwtToken(
//     userId: number,
//     email: string,
//   ): Promise<{ accessToken: string, refreshToken: string }> {
//     const payload = {
//       sub: userId,
//       email,
//     };
//     try {
//       const jwtString = await this.jwtService.signAsync(payload, {
//         expiresIn: '10m',
//         secret: this.configService.get('JWT_SECRET'),
//       });
//       const jwtStringRefresh = await this.jwtService.signAsync(payload, {
//         expiresIn: '7d',
//         secret: this.configService.get('JWT_REFRESH_TOKEN'),
//       });
//       await this.prismaService.user.update({
//         where: {
//           email: payload.email,
//         },
//         data: {
//           refresh_token: jwtStringRefresh,
//         },
//       });
//       return {
//         accessToken: jwtString,
//         refreshToken: jwtStringRefresh,
//       };
//     } catch (error) {
//       throw new HttpException('not valid', HttpStatus.BAD_REQUEST)
//     }
//   }
//   geUsersByEmail(email: string) {
//     return this.prismaService.user.findUnique({ where: { email } });
//   }
//   googleLogin(req) {
//     if (!req.user) {
//       return 'No user from google';
//     }

//     return {
//       message: 'User information from google',
//       user: req.user,
//     };
//   }
// }
