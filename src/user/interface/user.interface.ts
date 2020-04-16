import { Document } from 'mongoose'
import * as mongoose from 'mongoose'

export interface User extends Document {
    readonly name: string;
    readonly surname: string;
    readonly email: string;
    readonly password: string;
    readonly typeUser: object;
    readonly dateAt: Date;
    readonly dateUpdate: Date;
}