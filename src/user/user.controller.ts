import { Controller, Post, Get, Delete, Put, Res, NotFoundException, Param, Body } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service'
import { User } from './interface/user.interface'
import { identity, throwError } from 'rxjs';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ){}

    @Get()
    async getAllUser(@Res() res): Promise<User[]>{
        const data = await this.userService.getAllUser()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })

    }

    @Get(':id')
    async getUserById(@Res() res, @Param('id') id: string): Promise<User>{
        const data = await this.userService.getUserById(id)
        
        if(!data) {
            throw new NotFoundException('Does not existem item')
        }

        return res.status(200).json({
            data
        })
    }

    @Post('/create')
    async createUser(@Res() res, @Body() createUser: CreateUserDTO){
        const data = await this.userService.createUser(createUser)

        return res.status(200).json({
            data
        })
    }

    @Put('update/:id')
    async updateUser(@Res() res, @Param('id') id: string, @Body() updateUserDTO: CreateUserDTO): Promise<User>{
        const data = await this.userService.updateUser(id, updateUserDTO)
        
        if(!data) {
            throw new NotFoundException('This item does not exist')
        }

        return res.status(200).json({
            data
        })
    }

    @Delete(':id')
    async deleteUser(@Res() res, @Param('id') id: string): Promise<User>{
        const data = await this.userService.deleteUser(id)

        if(!data) {
            throw new NotFoundException('This utem does not exist')
        }

        return res.status(200).json({
            data
        })
    }


}
