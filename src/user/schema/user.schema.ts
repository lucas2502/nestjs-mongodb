import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    typeUser: {
        type: {
            admin: Boolean,
            dealer: Boolean,
        },
        required: true
    },
    dateAt: {
        type: Date
    },
    dateUpdate: {
        type: Date
    }
})
