import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export interface Enterprise extends Document {
    readonly name: string;
    readonly cnpj: number
    readonly telephone: number;
    readonly end: string;
    readonly userId: string;
    readonly dateAt: Date;
}