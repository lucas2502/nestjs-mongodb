import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import { Schema } from 'mongoose'

export const UserSchema = new Schema({
    username: {
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
    },
    dateAt: {
        type: Date,
        default: Date.now
    },
    dateUpdate: {
        type: Date
    }
})

/* UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
      if (!this.isModified('password')) {
        return next();
      }
      const hashed = await bcrypt.hashSync(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  }); */