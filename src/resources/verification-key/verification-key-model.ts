import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

const VerificationKeySchema = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: 'User' },
    code: {
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

export default mongoose.model('VerificationKey', VerificationKeySchema);
