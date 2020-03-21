import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { isEmail } from 'validator';
import { UserMiddleware } from './UserMiddleware';

class User extends mongoose.Schema {
  public user: mongoose.Schema;
  constructor() {
    const UserSchema = {
      email: {
        required: [true, 'required email'],
        trim: true,
        type: String,
        unique: true,
        validate: [isEmail, 'invalid email'],
      },
      phoneNumber: {
        required: [true, 'required phone number'],
        trim: true,
        type: String,
        unique: true,
      },
      firstName: {
        required: [true, 'required first name'],
        type: String,
        lowercase: true,
        trim: true
      },
      lastName: {
        required: [true, 'required last name'],
        type: String,
        lowercase: true,
        trim: true
      },
      passwordHash: {
        required: [true, 'required password'],
        trim: true,
        type: String,
      },
      userName: {
        required: [true, 'required username'],
        trim: true,
        type: String,
        unique: true,
      },
      picture: {
        type: String
      },
      verified: {
        type: Boolean
      },
      verificationCode: {
        type: Number
      }
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
      console.log(password);
      return bcryptjs.hashSync(password, 10);
    };
    this.user.methods.validatePassword = validatePassword;
    this.user.methods.createPasswordHash = createPasswordHash;
    return this.user;
  }
}

export default mongoose.model('User', new User());
