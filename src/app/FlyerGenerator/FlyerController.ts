import Environment from '../../config/environments';
import FlyerGenerator from '../FlyerGenerator/FlyerGenerator';

const config = Environment;

class FlyerController {

    public async helper(req, res) {
        const params = {
            user: {
                email: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
                picture: '',
            },
            category: {
                name: '',
                description: '',
            },
            offer: {
                title: '',
                description: '',
            },
        };

        FlyerGenerator.helper_big(params)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public async seeker(req, res) {
        const params = {
            user: {
                email: '',
                phoneNumber: '',
                firstName: '',
                lastName: '',
                picture: '',
            },
            category: {
                name: '',
                description: '',
            },
            request: {
                title: '',
                description: '',
            },
        };
        FlyerGenerator.seeking_big(params)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }
}

export default new FlyerController();
