import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body, Request, UseGuards, HttpStatus } from '@nestjs/common';
//import { LocalAuthGuard } from './local-auth.guard';
//import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { CreateUserDTO } from '../user/dto/user.dto';
//import { Payload } from './payload';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
    /* async login(@Body() loginUserDTO: LoginDTO) {
      const result  = await this.userService.validateUserByPassword(loginUserDTO)
      if(result.sucess) {
        return result.json(result.data)
      } else {
        return result.status(HttpStatus.UNAUTHORIZED).json({ message: result})
      }
       /*  const user = await this.userService.findByLogin(userDTO);
        const payload: Payload = {
          username: user.username,
          seller: user.seller,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
      } */

    @Post('register')
    async register(@Res() res, @Body() createUser: CreateUserDTO){
          const data = await this.userService.createUser(createUser)
  
          return res.status(200).json({
              data
          })
      }
      
}