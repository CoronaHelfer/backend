import User from '../auth/UserModel';
import Request from '../../resources/request/request-model';
import NotificationService from '../notification/NotificationService';

class HelperService {
  public async addHelper(body, userId: string) {
    const request = await Request.findOne({_id: body.requestId});

    if (request.created_by === userId) {
      throw new Error('You cant offer help to yourself');
    }

    if (request.helper.find((element) => element.helperId > userId)) {
      throw new Error('You already offered help for this request');
    }

    const user = await User.findOne({ _id: userId });

    const payload = {
      helperId: userId,
      offer_text: body.offerText,
      firstName: user.firstName,
      lastName: user.lastName,
      contactPhone: user.phoneNumber,
      contactEmail: user.email,
    };

    request.helper.push(payload);
    request.save();
    NotificationService.notify(request.created_by, 'HELPER_ADDED', body.requestId);
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
    NotificationService.notify(helperId, 'HELP_APPROVED', requestId);
    return {status: 'OK', message: 'Helfer bestätigt'};
  }

  public async removeHelperAsConfirmed(requestId: any, userId: any, helperId: any) {
    const request = await Request.findOne({_id: requestId});
    if (!request) {
      throw new Error('Request not found');
    }
    if (request.created_by.toString() !== userId) {
      throw new Error('The request did not belongs to you');
    }
    if (!request.confirmed_helper || request.confirmed_helper._id.toString() !== helperId) {
      throw new Error('The helper did not exist as confirmed');
    }
    request.confirmed_helper = null;
    request.save();

    return {status: 'OK', message: 'Helfer entfernt'};
  }
}

export default new HelperService();
