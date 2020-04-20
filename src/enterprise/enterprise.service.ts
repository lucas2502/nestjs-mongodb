import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Enterprise } from './interface/enterprise.interface';
import { CreateEnterpriseDTO } from './dto/enterprise.dto';

@Injectable()
export class EnterpriseService {
    
    constructor(
        @InjectModel('Enterprise') private enterpriseModel: Model<Enterprise>
    ){}

    async getAllEnterprise(): Promise<Enterprise[]> {
        const res = await this.enterpriseModel.find()
        return res
    }

    async getEnterpriseById(id: string): Promise<Enterprise[]> {
        const res = await this.enterpriseModel.findById(id)
        return res;
    }

    async getEnterpriseByUser(user: string): Promise<Enterprise[]> {
        const res = await this.enterpriseModel.find({ user })
        return res;
    }

    async createEnterprise(createEnterpriseDTO: CreateEnterpriseDTO, id: string): Promise<Enterprise>{ 
        const res = new this.enterpriseModel({
            ...createEnterpriseDTO,
            user: id
        })
        return res.save()
    }

    async updateEnterprise(id: string, updateEnterpriseDTO: CreateEnterpriseDTO): Promise<Enterprise>{
        const res = await  this.enterpriseModel.findByIdAndUpdate({ _id: id}, updateEnterpriseDTO, { new :true })
        return res;
    }

    async deleteEnterprise(id: string) {
        const res = await this.enterpriseModel.findByIdAndDelete(id)
        return res;
    }

    async getUserEnterpriseById(id: string, user: string){
        const res = await this.enterpriseModel.findById(id)

        if( res.user == user) {
            
            return res.user
        }
    }

    async getEnterpriseByCNPJ(cnpj: number): Promise<Enterprise[]> {
        const res = await this.enterpriseModel.find({ cnpj })
        return res;
    }
}
