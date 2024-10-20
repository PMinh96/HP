// import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthDTO } from './dto';
// import { GoogleOAuthGuard } from './guard/google-oauth.guard';
// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
//   @Post('/register')
//   register(@Body() Body: AuthDTO) {
//     return this.authService.regiter(Body);
//   }
//   @Post('login')
//   login(@Body() Body: AuthDTO) {
//     return this.authService.login(Body);
//   }
//   @Post('refresh-token')
//   refreshToken(@Body() {refresh_token}): Promise<any> {
//     return this.authService.refreshToken(refresh_token);
//   }
//   @Get()
//   @UseGuards(GoogleOAuthGuard)
//   async googleAuth(@Request() req) {

//   }

//   @Get('google-redirect')
//   @UseGuards(GoogleOAuthGuard)
//   googleAuthRedirect(@Request() req) {
//     return this.authService.googleLogin(req);
//   }
// }
