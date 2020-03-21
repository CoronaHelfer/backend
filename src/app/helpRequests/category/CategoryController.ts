import CategoryService from './CategoryService';

class CategoryController {

    public create(req, res) {
        const body = req.body;
        CategoryService.create(body)
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

    public findAll(req, res) {
        CategoryService.find({})
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }

}

export default new CategoryController();
