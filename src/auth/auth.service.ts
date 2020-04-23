
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
//import { Payload } from './payload';
//import { sign } from 'crypto';

import { LoginDTO  } from './dto/auth.dto';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}

      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        console.log(user);
        console.log('res',await this.passwordsAreEqual(user.password, pass))
        
        if (user && (await this.passwordsAreEqual(user.password, pass))) {
          const { password, ...result } = user;

          return result;
        }
        return null;
      }
    
      async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
          accessToken: this.jwtService.sign(payload)
        };
      }
    
      private async passwordsAreEqual(
        hashedPassword: string | undefined,
        plainPassword: string | undefined
      ): Promise<boolean> {
        return bcrypt.compareSync(plainPassword, hashedPassword);
      }
      /* async validateUserByPassword(loginAttempt: LoginDTO): Promise<any> {
        const userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);
 
        return new Promise((resolve) => {
            if (!userToAttempt) {
                resolve({success: false, msg: 'User not found'});
            }
            userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {
                if(err) resolve({success: false, msg: 'Unexpected error. Please try again later.'});
    
                if(isMatch){
                    resolve({success: true, data: this.createJwtPayload(userToAttempt)});
                } else {
                    resolve({success: false, msg: 'Wrong password'})
                }
            });
        });
      }
        createJwtPayload(user){
          let data: JwtPayload = {
              id: user._id,
              email: user.email
          };
   
          let jwt = this.jwtService.sign(data);
   
          return {
              exp: 36000,
              token: jwt            
          }
      }
   
      async validateUser(payload: JwtPayload): Promise<any> {
          return await this.usersService.getUser(payload.id);
      }
 */
      /* async signPayload(payload: Payload) {
        return sign(payload, process.env.SECRET_KEY, { expiresIn: '12h' });
      }
    
      async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      } */
}