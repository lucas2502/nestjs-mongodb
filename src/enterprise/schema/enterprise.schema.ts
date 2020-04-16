import { Schema } from 'mongoose'

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

    userId: {
        type: String,
        required: true
    },

    dateAt: {
        type: Date
    },
    dateUpdate: {
        type: Date
    }
})
