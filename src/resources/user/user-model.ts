import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
import { isEmail } from 'validator';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, sparse: true, trim: true, validate: [isEmail, 'invalid email'] },
    phoneNumber: { type: String, trim: true, sparse: true, unique: true },
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    passwordHash: { trim: true, type: String, required: true },
    address: {
      plz: { type: String },
      city: { type: String },
      street: { type: String },
      street_nr: { type: String },
    },
    verified: { type: Boolean, default: false },
    fcmToken: { trim: true, type: String },
    jwtSecret: {
      type: Number,
      default: () => {
        return Math.floor(Math.random() * 99999) + 10000;
      },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const validatePassword = (password, passwordHash) => {
  return bcryptjs.compareSync(password, passwordHash);
};

const createPasswordHash = (password) => {
  return bcryptjs.hashSync(password, 10);
};

UserSchema.methods.validatePassword = validatePassword;
UserSchema.methods.createPasswordHash = createPasswordHash;

export default mongoose.model('User', UserSchema);
