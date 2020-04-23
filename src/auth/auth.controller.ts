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
      if (!(body && body.username && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }
  
      const user = await this.userService.getUserByUsername(body.username);

      if (user) {
        const resHash = await this.userService.compareHash(body.password, user[0].password)
        
        if (resHash) {
          const token = await this.authService.createToken(user[0].username)
          
          return res.status(HttpStatus.OK).json(token);
        }
      }
  
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username or password wrong!' });
    }

    @Post('register')
    async registerUser(@Response() res: any, @Body() body: User) {
      if (!(body && body.username && body.password)) {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username and password are required!' });
      }

      let user = await this.userService.getUserByUsername(body.username);
      console.log('getUserByUsername', user)
      if (!user.username) {
        user = await this.userService.createUser(body);
        if (user) {
          console.log("user", user);
        }
        
      } else {
        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Username exists' });
      }

      return res.status(HttpStatus.OK).json(user);
    }
      
}