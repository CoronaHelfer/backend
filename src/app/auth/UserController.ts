import UserService from './UserService';

class UserController {

    public login(req, res) {
        const body = req.body;
        UserService.isValidUser(body)
            .then((result) => res.status(200).send({token: result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public register(req, res) {
        const body = req.body;
        UserService.create(body)
            .then((result) => res.status(201).send({token: result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public search(req, res) {
        UserService.find({})
            .then((result) => res.status(200).send({users: result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public didExist(id: string): Promise<boolean> {
        return new Promise((res, rej) => {
            UserService.findOne({_id: id})
                .then((result) => {
                    if (result) {
                        res(true);
                    } else {
                        res(false);
                    }
                })
                .catch((err) => res(false));
        });
    }

    public me(req, res) {
        UserService.find({_id: req.decoded._id})
            .then((result) => res.status(200).send({user: result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public delete(req, res) {
        UserService.delete()
            .then((result) => res.status(200).send({result: result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }
}

export default new UserController();
