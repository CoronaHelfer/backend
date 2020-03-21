import Environment from '../../config/environments';
import UserService from '../auth/UserService';
import Request from './RequestModel';

const config = Environment;

class RequestService {
    public request: any;

    public async find(q) {
        const requests = await Request.find(q);

        const responseList = [];
        for (const request of requests) {
            const createdBy = await UserService.findOne({_id: request.created_by});

            responseList.push({
                _id: request._id,
                distance: 999, // todo calc distance
                title: request.title,
                description: request.description,
                category: request.category,
                created_by: {
                    firstName: createdBy.firstName,
                    lastName: createdBy.lastName.slice(0, 1) + '.',
                    picture: createdBy.picture ? createdBy.picture : '',
                },
            });
        }

        return responseList;
    }

    public async getOwn(userId) {
        const requests = await Request.find({created_by: userId});

        const responseList = [];
        for (const request of requests) {
            const helperList = [];

            for (const helper of request.helper) {
                const helperObject = await UserService.findOne({_id: helper.helperId});
                helperList.push({
                    firstName: helperObject.firstName,
                    lastName: helperObject.lastName.slice(0, 1) + '.',
                    picture: helperObject.picture ? helperObject.picture : '',
                    offer_text: helper.offer_text,
                });
            }

            responseList.push({
                address: requests.address,
                _id: request._id,
                title: request.title,
                description: request.description,
                category: request.category,
                created_by: request.created_by,
                helper: helperList,
            });
        }

        return responseList;
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

        if (request.created_by === userId) {
            throw new Error('You cant offer help to yourself');
        }

        if (request.helper.find((element) => element.helperId > userId)) {
            throw new Error('You already offered help for this request');
        }

        const payload = {
            helperId: userId,
            offer_text: body.offerText,
        };

        request.helper.push(payload);
        request.save();
        return {status: 'OK', message: 'Hilfe angeboten'};
    }

    public async confirmHelper(helperId: string, userId: string, requestId: string) {
        const request = await Request.findOne({_id: requestId});
        if (request.created_by.toString() !== userId) {
            throw new Error('The request did not belongs to you');
        }
        if (request.confirmed_helper) {
            throw new Error('You already confirmed a user');
        }
        if (!request.helper.find((element) => element.helperId.toString() === helperId)) {
            throw new Error('The helper did not exist');
        }
        request.confirmed_helper = helperId;
        request.save();
        return {status: 'OK', message: 'Helfer bestätigt'};
    }
}

export default new RequestService();
