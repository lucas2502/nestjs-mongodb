import { Controller, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interface/user.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}


    
    @Post('login')
    async loginUser(@Response() res: any, @Body() body: User) {
      if (!(body && body.email && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
  
      const user = await this.userService.findOneByEmail(body.email);
      
      if (user) {
        const resHash = await this.userService.compareHash(body.password, user.password)
        
        if (resHash) {
          const token = await this.authService.createToken(user.email)
          
          return res.status(HttpStatus.OK).json(token);
        }
      }
  
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {
      
      if (!(body && body.email && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
      let user = await this.userService.findOneByEmail(body.email);
      
      if (!user) {
        user = await this.userService.createUser(body);
        if (user) {
          console.log("user", user);
        }
        
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'User exists' });
      }

      return res.status(HttpStatus.OK).json(user);
    }
      
}