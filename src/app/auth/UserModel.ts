import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { isEmail } from 'validator';

import { UserMiddleware } from './UserMiddleware';

class User extends mongoose.Schema {
  public user: mongoose.Schema;

  constructor() {
    const UserSchema = {
      email: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        validate: [isEmail, 'invalid email'],
      },
      phoneNumber: {
        type: String,
        trim: true,
        sparse: true,
        unique: true,
      },
      firstName: {
        required: [true, 'required first name'],
        type: String,
        trim: true,
      },
      lastName: {
        required: [true, 'required last name'],
        type: String,
        trim: true,
      },
      passwordHash: {
        required: [true, 'required password'],
        trim: true,
        type: String,
      },
      picture: {
        type: String,
      },
      address: {
        plz: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        street: {
          type: String,
          required: false,
        },
        street_nr: {
          type: String,
          required: false,
        },
      },
      verified: {
        type: Boolean,
        default: false,
      },
      fcmToken: {
        trim: true,
        type: String,
      },
      jwtSecret: {
        type: Number,
        default: () => {
          return Math.floor(Math.random() * 99999) + 10000;
        },
      },
    };

    const user = super(UserSchema, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });

    this.user = user;

    this.user.plugin(UserMiddleware);

    const validatePassword = (password, passwordHash) => {
      return bcryptjs.compareSync(password, passwordHash);
    };

    const createPasswordHash = (password) => {
      return bcryptjs.hashSync(password, 10);
    };

    this.user.methods.validatePassword = validatePassword;
    this.user.methods.createPasswordHash = createPasswordHash;

    return this.user;
  }
}

export default mongoose.model('User', new User());
