import GeocodingService from '../geocoding/GeocodingService';
import RequestService from './RequestService';

class RequestController {
  public create(req, res) {
    const body = req.body;

    RequestService.create(body, req.decoded._id)
      .then((result) => res.status(200).send({result}))
      .catch((err) => res.status(500).send({error: err.message}));
  }

  public async find(req, res) {
    const query: any = {};
    let ownPosition: number[] = [];

    if (req.query.zipcode) {
      ownPosition = await GeocodingService.addressToCoordinate(req.query.zipcode);

      // Compute radius using radians
      // Divide distance by Earth radius
      // Earth Radius = 6378 km
      const radius = req.query.distance / 6378;

      if (ownPosition) {
        query['address.location'] = {
          $geoWithin: {
            $centerSphere: [
              ownPosition,
              radius || 10,
            ],
          },
        };
      }
    }

    if (req.query.categoryIds) {
      query.category = {
        $in: req.query.categoryIds.split(','),
      };
    }

    console.log(JSON.stringify(query, null, 2));

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
