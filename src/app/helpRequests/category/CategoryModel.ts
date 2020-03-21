import mongoose from 'mongoose';

class Category extends mongoose.Schema {
    public category: mongoose.Schema;

    constructor() {
        const CategorySchema = {
            name: {
                type: String,
                required: true,
                unique: true,
            },
            description: {
                type: String,
                required: false,
            },
        };
        const request = super(CategorySchema, {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
            },
        });
        this.category = request;
        // this.request.plugin(CatagoryMiddleware);

        return this.category;
    }
}

export default mongoose.model('Category', new Category());
