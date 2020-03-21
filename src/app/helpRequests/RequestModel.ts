import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;
import {RequestMiddleware} from './RequestMiddleware';

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
                position: {
                    lat: {
                        type: String,
                        required: true,
                    },
                    lon: {
                        type: String,
                        required: true,
                    },
                },
                plz: {
                    type: String,
                    required: true,
                },
                city: {
                    type: String,
                    required: true,
                },
                street: {
                    type: String,
                    required: true,
                },
                street_nr: {
                    type: String,
                    required: true,
                },
            },
            time_end: {
                type: Date,
                required: false,
            },
            helper: [{
                helperId: {
                    type: ObjectId,
                    ref: 'User',
                },
                offer_text: {
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
        this.request.plugin(RequestMiddleware);

        return this.request;
    }
}

export default mongoose.model('Request', new Request());
