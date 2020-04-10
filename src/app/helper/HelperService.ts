import Request from '../helpRequests/RequestModel';

class HelperService {
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

export default new HelperService();
