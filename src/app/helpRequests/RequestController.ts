import GeocodingService from '../geocoding/GeocodingService';
import RequestService from './RequestService';

import Environment from '../../config/environments';

const config = Environment;

class RequestController {

    public create(req, res) {
        const body = req.body;

        RequestService.create(body, req.decoded._id)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public async find(req, res) {
        let ownPosition = [];
        const address = {
            plz: req.body['address.plz'],
            city: req.body['address.city'],
            street: req.body['address.street'],
            street_nr: req.body['address.street_nr'],
        };
        const position = req.body.position;
        if (address.plz || (position && position[0] && position[1])) {
            if (position && position[0] && position[1]) {
                ownPosition = position;
            } else {
                ownPosition = await GeocodingService.addressToCoordinate(address.plz, address.street,
                    address.city, address.street_nr);
            }
        }
        if (!ownPosition.length) {
            res.status(500).send({error: 'no position'});
            return;
        }

        const query = [];
        if (req.body.category) {
            query.push({category: {$in: req.body.category}});
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

        RequestService.find({$and: query})
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public getOwn(req, res) {
        RequestService.getOwn(req.decoded._id)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public getListOfOwnHelps(req, res) {
        const userId = req.decoded._id;
        RequestService.find({'helper.helperId': userId}, userId)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public offerHelp(req, res) {
        const body = req.body;
        RequestService.addHelper(body, req.decoded._id)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public confirmHelp(req, res) {
        const body = req.body;
        RequestService.confirmHelper(body.helperId, req.decoded._id, body.requestId)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }
}

export default new RequestController();
