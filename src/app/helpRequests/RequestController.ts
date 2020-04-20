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
      plz: req.headers['address.plz'],
      city: req.headers['address.city'],
      street: req.headers['address.street'],
      street_nr: req.headers['address.street_nr'],
    };
    const position = req.headers.position ? JSON.parse(`[${req.headers.position}]`) : null;
    if ((address.plz || address.city) || (position && position[0] && position[1])) {
      if (position && position[0] && position[1]) {
        ownPosition = position;
      } else {
        ownPosition = await GeocodingService.addressToCoordinate(address.plz, address.street,
          address.city, address.street_nr);
      }
    }

    if (!ownPosition || !ownPosition.length) {
      res.status(500).send({error: 'no position'});
      return;
    }

    const query = [];
    if (req.headers.category) {
      query.push({category: {$in: req.headers.category}});
    }

    query.push({
      'address.location': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: ownPosition,
          },
          $maxDistance: config.REQUEST_MAX_DISTANCE,
          $minDistance: 0,
        },
      },
    });

    RequestService.find({$and: query}, null, ownPosition)
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
