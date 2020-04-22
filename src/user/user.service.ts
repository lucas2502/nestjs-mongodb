import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import { LoginDTO } from '../auth/dto/auth.dto';
import { Payload } from '../auth/payload'

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private userModel: Model<User>
    ){}

    async getAllUser(): Promise<User[]>{
        const res = await this.userModel.find()
        return res;
    }

    async getUserById(id: string): Promise<User>{
        const res = await this.userModel.finById(id)
        return res;
    }

    async createUser(createUser: CreateUserDTO): Promise<User>{
        const res = new this.userModel(createUser)
        return res.save()
    }

    async updateUser(id: string, updateUserDTO: CreateUserDTO): Promise<User>{
        const res = await this.userModel.findByIdAndUpdate({ _id: id}, updateUserDTO, {new: true})
        return res;
    }

    async deleteUser(id: string): Promise<User>{
        const res = await this.userModel.findByIdAndDelete(id)
        return res;

    }

    async findOne(username: string): Promise<User | undefined> {
        const res = await this.userModel.find({ username })
        return res;
      }

      async findByLogin(userDTO: LoginDTO) {
        const { username, password } = userDTO;
        
        const user = await this.userModel
          .findOne({ username })
          .select('username password seller created address');
        if (!user) {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    
        if (await bcrypt.compare(password, user.password)) {
          return user;
        } else {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
      }
    
      async findByPayload(payload: Payload) {
        const { username } = payload;
        return await this.userModel.findOne({ username });
      }
}
