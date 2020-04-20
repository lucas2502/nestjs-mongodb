//import * as bcrypt from 'bcrypt';
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
      const hashed = await bcrypt.hash(this['password'], 10);
      this['password'] = hashed;
      return next();
    } catch (err) {
      return next(err);
    }
  }); */