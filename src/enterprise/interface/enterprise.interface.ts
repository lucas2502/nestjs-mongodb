import { Document } from 'mongoose'
import * as mongoose from 'mongoose'
import { User } from 'src/user/interface/user.interface'

export interface Enterprise extends Document {
    readonly name: string;
    readonly cnpj: number
    readonly telephone: number;
    readonly end: string;
    readonly user: User;
    readonly dateAt: Date;
}