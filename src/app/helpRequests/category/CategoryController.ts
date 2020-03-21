import CategoryService from './CategoryService';

class CategoryController {

    public findAll(req, res) {
        CategoryService.find({})
            .then((result) => res.status(200).send({result}))
            .catch((err) => res.status(500).send({error: err.message}));
    }
}

export default new CategoryController();
