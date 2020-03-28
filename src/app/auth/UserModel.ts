import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import {isEmail} from 'validator';
import {UserMiddleware} from './UserMiddleware';

import Environment from '../../config/environments';

const config = Environment;

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
                default: () => {
                    return config.DEFAULT_PROFILE_PICTURES[Math.floor(Math.random() * 4)];
                },
            },
            verification: {
                verified: {
                    type: Boolean,
                    default: false,
                },
                code: {
                    type: Number,
                    default: () => {
                        return Math.floor(Math.random() * 99999) + 10000;
                    },
                },
            },
            fcmToken: {
                trim: true,
                type: String,
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
            console.log(password);
            return bcryptjs.hashSync(password, 10);
        };
        this.user.methods.validatePassword = validatePassword;
        this.user.methods.createPasswordHash = createPasswordHash;
        return this.user;
    }
}

export default mongoose.model('User', new User());
