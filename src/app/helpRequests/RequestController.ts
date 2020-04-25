import Environment from '../../config/environments';
import GeocodingService from '../geocoding/GeocodingService';
import RequestService from './RequestService';

const config = Environment;

class RequestController {

  public create(req, res) {
    const body = req.body;

    RequestService.create(body, req.decoded._id)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public async find(req, res) {
    let ownPosition: number[];

    const address = {
      plz: req.query.plz,
      city: req.query.city,
      street: req.query.street,
      street_nr: req.query.street_nr,
    };

    const latitude = req.query.lat;
    const longitude = req.query.lon;

    if (latitude && longitude) {
      ownPosition = [longitude, latitude];
    } else if (address.plz || address.city) {
      ownPosition = await GeocodingService.addressToCoordinate(
        address.plz,
        address.street,
        address.city,
        address.street_nr,
      );
    }

    const query: any = {};

    if (req.headers.category) {
      query.category = {
        $in: req.headers.category,
      };
    }

    if (ownPosition) {
      query.address.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: ownPosition,
          },
          $maxDistance: config.REQUEST_MAX_DISTANCE,
          $minDistance: 0,
        },
      };
    }

    RequestService.find(query, null, ownPosition)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public getOwn(req, res) {
    RequestService.getOwn(req.decoded._id)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public deleteOwn(req, res) {
    RequestService.deleteOwn(req.decoded._id, req.body.requestId)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public finish(req, res) {
    RequestService.finish(req.decoded._id, req.body.requestId)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }
}

export default new RequestController();
