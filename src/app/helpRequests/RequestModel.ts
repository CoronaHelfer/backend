import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { isEmail } from 'validator';
import { RequestMiddleware } from './RequestMiddleware';

class Request extends mongoose.Schema {
    public request: mongoose.Schema;
    constructor() {
        const RequestSchema = {
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
