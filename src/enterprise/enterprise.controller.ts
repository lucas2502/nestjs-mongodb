import { Controller, Get, Post, Put, Delete, NotFoundException, Res, Param, Body } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { Enterprise } from './interface/enterprise.interface';
import { CreateEnterpriseDTO } from './dto/enterprise.dto';

@Controller('enterprise')
export class EnterpriseController {
    
    constructor(
        private enterpriseService: EnterpriseService
    ){}

    @Get()
    async getAllEnterprise(@Res() res): Promise<Enterprise[]>{
        const data = await this.enterpriseService.getAllEnterprise()

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Get(':user/:id')
    async getEnterpriseById(@Res() res, @Param('id') id: string, @Param('user') user: string): Promise<Enterprise[]>{
        let data = null;

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        const validateUser = await this.enterpriseService.getUserEnterpriseById(id, user)
        if(user === validateUser){
            data = await this.enterpriseService.getEnterpriseById(id)
            
        } else {
            throw new NotFoundException('Does not acess to item')  
        }

        return res.status(200).json({
            data
        })
    }

    @Get('user')
    async getEnterpriseByUser(@Res() res, @Param('user') user:string): Promise<Enterprise[]>{
        const data = await this.enterpriseService.getEnterpriseByUser(user)
        if(!data){
            
        }

        return res.status(200).json({
            data
        })
    }

    @Post('/create/:id')
    async createEnterprise(
        @Res() res,
        @Param('id') id:string,
        @Body() createEnterpriseDTO: CreateEnterpriseDTO){
        const body = {...createEnterpriseDTO, userId: String(id)}
        
        const existId = this.enterpriseService.getEnterpriseById(id) 
        if(!existId){
            const data = await this.enterpriseService.createEnterprise(body)
            
            return res.status(200).json({
                data
            })
        } else {
            return res.status(500).json({
                data: 'Existe item'
            })
        }
    }

    @Put('update/:id')
    async updateEnterprise(
        @Res() res,
        @Param('id') id: string,
        @Body() updateEnterpriseDTO: CreateEnterpriseDTO ): Promise<Enterprise>{
        const data = await this.enterpriseService.updateEnterprise(id, updateEnterpriseDTO)
        if(!data){
            throw new NotFoundException('This item is not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Delete(':user/:id')
    async deleEnterprise(
        @Res() res,
        @Param('id') id: string,
        @Param('user') user: string): Promise<Enterprise>{
        let data = null;

        if(!data){
            throw new NotFoundException('Does not existem itens')
        }
        const validateUser = await this.enterpriseService.getUserEnterpriseById(id, user)
        if(user === validateUser){
            data = await this.enterpriseService.deleteEnterprise(id)
        } else {
            throw new NotFoundException('Does not permission to delete item')
        }

        return res.status(200).json({
            data
        })
    }

}
