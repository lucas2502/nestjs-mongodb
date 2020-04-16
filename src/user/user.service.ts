import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';

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
}
