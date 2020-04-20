import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

export const EnterpriseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cnpj: {
        type: Number,
        required: true
    },
    telephone: {
        type: Number,
        required: true
    },
    end: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    dateAt: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date
    }
})
