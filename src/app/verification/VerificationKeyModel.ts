import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;

class VerificationKey extends mongoose.Schema {
  public verificationKey: mongoose.Schema;

  constructor() {
    const VerificationKeySchema = {
      userId: {
        type: ObjectId,
        ref: 'User',
      },
      code: {
        type: Number,
        default: () => {
          return Math.floor(Math.random() * 99999) + 10000;
        },
      },
    };
    const verificationKey = super(VerificationKeySchema, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });
    this.verificationKey = verificationKey;
    return this.verificationKey;
  }

}

export default mongoose.model('VerificationKey', new VerificationKey());
