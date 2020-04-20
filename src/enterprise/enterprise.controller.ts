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

        const validateUser = await this.enterpriseService.getUserEnterpriseById(id, user)
        if(user == validateUser){
            const data = await this.enterpriseService.getEnterpriseById(id)
            
            if(!data){
                throw new NotFoundException('Does not existem itens')
            }
            return res.status(200).json({
                data
            })            
        } else {
            throw new NotFoundException('Does not acess to item')  
        }

    }

    @Get(':user')
    async getEnterpriseByUser(@Res() res, @Param('user') user:string): Promise<Enterprise[]>{
        const data = await this.enterpriseService.getEnterpriseByUser(user)
        
        if(!data){
            throw new NotFoundException('Does not existem itens')
        }

        return res.status(200).json({
            data
        })
    }

    @Post('/create/:id')
    async createEnterprise(
        @Res() res,
        @Param('id') id: string,
        @Body() createEnterpriseDTO: CreateEnterpriseDTO){
        
        const existEnterprise = await this.enterpriseService.getEnterpriseByCNPJ(createEnterpriseDTO.cnpj)
        if(existEnterprise.length === 0){
            const data = await this.enterpriseService.createEnterprise(createEnterpriseDTO, id)
            
            return res.status(200).json({
                "message": "Create",
                data
            })
        } else {
            return res.status(500).json({
                data: 'Does not existe item'
            })
        }
    }

    @Put('update/:user/:id')
    async updateEnterprise(
        @Res() res,
        @Param('id') id: string,
        @Param('user') user: string,
        @Body() updateEnterpriseDTO: CreateEnterpriseDTO ): Promise<Enterprise>{
            
        const existEnterprise = await this.enterpriseService.getEnterpriseByCNPJ(updateEnterpriseDTO.cnpj)
        if(existEnterprise){
            const validateUser = await this.enterpriseService.getUserEnterpriseById(id, user)
            if(user == validateUser){
                const data = await this.enterpriseService.updateEnterprise(id, updateEnterpriseDTO)
            
                return res.status(200).json({
                    "message": "Update", 
                    data
                })
            } else {
                return res.status(500).json({
                    data: 'Does not permission edit item'
                })
            }
        } else {
            return res.status(500).json({
                data: 'Does not existe item'
            })
        }
    }

    @Delete(':user/:id')
    async deleEnterprise(
        @Res() res,
        @Param('id') id: string,
        @Param('user') user: string): Promise<Enterprise>{
            
        const existEnterprise = await this.enterpriseService.getEnterpriseById(id)
        if(existEnterprise){
            const validateUser = await this.enterpriseService.getUserEnterpriseById(id, user)
            if(user == validateUser){
                const data = await this.enterpriseService.deleteEnterprise(id)
            
                return res.status(200).json({
                    "message": "Delete", 
                    data
                })
            } else {
                return res.status(500).json({
                    data: 'Does not permission edit item'
                })
            }
        } else {
            return res.status(500).json({
                data: 'Does not existe item'
            })
        }
    }

}
