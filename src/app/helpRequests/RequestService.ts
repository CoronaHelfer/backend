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

    public async create(q, createdBy) {
        const request = new Request(q);

        // todo get geolocation
        request.address.position.lat = '123';
        request.address.position.lon = '321';
        request.created_by = createdBy;

        this.request = await request.save();
        return this.request;
    }

    public async addHelper(body, userId: string) {
        const request = await Request.findOne({_id: body.requestId});

        const payload = {
            helperId: userId,
            offer_text: body.offerText,
        };

        request.helper.push(payload);

        request.save();
    }
}

export default new RequestService();
