import RequestService from './RequestService';

class RequestController {

    public create(req, res) {
        const body = req.body;

        RequestService.create(body, req.decoded._id)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public find(req, res) {
        // Find Code would written here
    }

    public update(req, res) {
        // Update Code would written here
    }

    public offerHelp(req, res) {
    }

    public confirmHelp(req, res) {
    }
}

export default new RequestController();
