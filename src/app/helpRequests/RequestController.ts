import RequestService from './RequestService';

class RequestController {

    public create(req, res) {
        const body = req.body;

        RequestService.create(body, req.decoded._id)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public find(req, res) {
        const position = {
            lat: req.body.lat,
            lon: req.body.lon,
        };
        const categoryQuery = req.body.categories ? {category: {$in: req.body.categories}} : {};

        RequestService.find(categoryQuery)
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
