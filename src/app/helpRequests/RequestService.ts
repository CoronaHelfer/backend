import Environment from '../../config/environments';
import Request from './RequestModel';

const config = Environment;

class RequestService {
    public request: any;

    public async find(q) {
        return Request.find(q);
    }

    public async findOne(q) {
        return await Request.findOne(q);
    }

    public async create(q) {
        const request = new Request(q);
        this.request = await request.save();
        return this.request;
    }
}

export default new RequestService();
