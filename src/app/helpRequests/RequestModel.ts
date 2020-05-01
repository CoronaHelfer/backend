import mongoose from 'mongoose';
import {RequestMiddleware} from './RequestMiddleware';

const ObjectId = mongoose.Schema.Types.ObjectId;

class Request extends mongoose.Schema {
  public request: mongoose.Schema;

  constructor() {
    const RequestSchema = {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
      },
      created_by: {
        type: ObjectId,
        ref: 'User',
        required: true,
      },
      address: {
        location: {
          type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: true,
          },
          coordinates: {
            type: [Number],
            default: [0, 0],
            required: true,
          },
        },
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
      time_start: {
        type: Date,
        required: false,
      },
      time_end: {
        type: Date,
        required: false,
      },
      isFinished: {
        type: Boolean,
        default: false,
      },
      isPublic: {
        type: Boolean,
        default: true,
      },
      confirmed_helper: {
        type: ObjectId,
        ref: 'User',
      },
      helper: [{
        helperId: {
          type: ObjectId,
          ref: 'User',
        },
        offer_text: {
          type: String,
        },
        contactEmail: {
          type: String,
        },
        contactPhone: {
          type: String,
        },
      }],
    };
    const request = super(RequestSchema, {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    });
    this.request = request;
    this.request.index({'address.location': '2dsphere'});
    this.request.plugin(RequestMiddleware);

    return this.request;
  }
}

export default mongoose.model('Request', new Request());
