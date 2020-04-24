import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';
import { CreateUserDTO } from './dto/user.dto';
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
        res.password = await this.getHash(res.password)
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

    async getUserByUsername(username: string): Promise<User | undefined> {
        const res = await this.userModel.findOne({ username })
        return res;
      }
    

      async findOneByEmail(email: string): Promise<User | undefined>{
        const res = await this.userModel.findOne({ email })
        return res;
      }

      async getHash(password: string|undefined): Promise<string> {
        return await bcrypt.hashSync(password, 10);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
      }
}
