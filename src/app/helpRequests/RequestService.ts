import UserService from '../auth/UserService';
import CategoryService from '../category/CategoryService';
import GeocodingService from '../geocoding/GeocodingService';
import Request from './RequestModel';

class RequestService {
  public request: any;

  public async find(q, helperId = null, ownPosition: number[] = null) {
    const requests = await Request.find(q);

    const responseList = [];
    for (const request of requests) {
      const createdBy = await UserService.findOne({_id: request.created_by});

      const element = {
        _id: request._id,
        distance: ownPosition ? GeocodingService.distanceBetweenTwoCoordinates(request.address.location.coordinates[0],
          request.address.location.coordinates[1], ownPosition[0], ownPosition[1]) : 0,
        title: request.title,
        description: request.description,
        category: await CategoryService.findOne({_id: request.category.toString()}),
        created_by: {
          _id: createdBy._id,
          firstName: createdBy.firstName,
          lastName: createdBy.lastName.slice(0, 1) + '.',
          picture: createdBy.picture ? createdBy.picture : '',
        },
        confirmed_helper: request.confirmed_helper,
        created_at: request.created_at,
        time_start: request.time_start,
        time_end: request.time_end,
      };

      if (helperId) {
        const offer = request.helper.find((x) => x.helperId.toString() === helperId);
        // @ts-ignore
        element.offer_text = offer.offer_text;
      }
      responseList.push(element);
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
          _id: helperObject._id,
          firstName: helperObject.firstName,
          lastName: helperObject.lastName.slice(0, 1) + '.',
          picture: helperObject.picture ? helperObject.picture : '',
          offer_text: helper.offer_text,
        });
      }

      console.log(request);
      const confirmedHelperObject = request.confirmed_helper
      ? await UserService.findOne({_id: request.confirmed_helper})
      : undefined;

      responseList.push({
        address: requests.address,
        _id: request._id,
        title: request.title,
        description: request.description,
        category: await CategoryService.findOne({_id: request.category.toString()}),
        created_by: request.created_by,
        helper: helperList,
        confirmed_helper: confirmedHelperObject ? {
          _id: confirmedHelperObject._id,
          firstName: confirmedHelperObject.firstName,
          lastName: confirmedHelperObject.lastName.slice(0, 1) + '.',
          picture: confirmedHelperObject.picture ? confirmedHelperObject.picture : '',
          offer_text: confirmedHelperObject.offer_text,
        } : null,
        created_at: request.created_at,
        time_start: request.time_start,
      });
    }

    return responseList;
  }

  public async create(q, createdBy) {
    const request = new Request(q);

    const addressDefined = request.address && request.address.plz && request.address.city && request.address.street
      && request.address.street_nr;
    const locationDefined = request.address && request.address.position && request.address.position.lat
      && request.address.position.lon;

    if (!addressDefined && !locationDefined) {
      throw new Error('Address or Geolocation required');
    }

    if (!locationDefined) {
      request.address.location.coordinates = await GeocodingService.addressToCoordinate(request.address.plz,
        request.address.street, request.address.city, request.address.street_nr);
    }

    request.created_by = createdBy;

    this.request = await request.save();
    return this.request;
  }

  public async deleteOwn(userId: string, requestId: string) {
    const request = await Request.findOne({_id: requestId});
    if (!request) {
      throw new Error('Request not found');
    }
    if (request.created_by.toString() !== userId) {
      throw new Error('The request did not belongs to you');
    }
    request.delete();
    return {status: 'OK', message: 'Request gelöscht'};
  }

  public async finish(userId: string, requestId: string) {
    const request = await Request.findOne({_id: requestId});
    if (!request) {
      throw new Error('Request not found');
    }
    if (request.created_by.toString() !== userId) {
      throw new Error('The request did not belongs to you');
    }
    if (request.isFinished) {
      throw new Error('The Request is already finished');
    }

    request.isFinished = true;
    request.save();

    return {status: 'OK', message: 'Request finished'};
  }
}

export default new RequestService();
