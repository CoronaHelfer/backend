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
        const categories = req.body.categories;

        RequestService.find({})
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
