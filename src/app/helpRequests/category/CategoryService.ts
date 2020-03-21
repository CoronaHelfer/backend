import Environment from '../../../config/environments';
import Category from './CategoryModel';

const config = Environment;

class CategoryService {
    public category: any;

    public async find(q) {
        return Category.find(q);
    }

    public async findOne(q) {
        return await Category.findOne(q);
    }

    public async create(q) {
        const category = new Category(q);
        this.category = await category.save();
        return this.category;
    }
}

export default new CategoryService();
