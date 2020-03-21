import Environment from '../../../config/environments';
import Category from './CategoryModel';

const config = Environment;

class CategoryService {
    public category: any;

    public async find(q) {
        const projection = {
            __v: false,
            created_at: false,
            updated_at: false,
        };
        return Category.find(q, projection);
    }

    public async create(q) {
        const category = new Category(q);
        this.category = await category.save();
        return this.category;
    }
}

export default new CategoryService();
