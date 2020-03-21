import CategoryService from '../../app/helpRequests/category/CategoryService';

class InitCategories {

    private categoriesList = [
        {
            name: 'Kurierdienste',
            description: ' ',
            internal_id: 1,
        }, {
            name: 'Warenleistungen ',
            description: ' ',
            internal_id: 2,
        }, {
            name: 'Bildung',
            description: ' ',
            internal_id: 3,
        }, {
            name: 'Soziales & Gemeinschaft',
            description: ' ',
            internal_id: 4,
        },
    ];

    public start() {
        this.categoriesList.forEach((category) => {
            CategoryService.create(category)
                .then((result) => {
                    console.log('category created: ' + category.name);
                })
                .catch((err) => {
                    console.log('category exist: ' + category.name);
                });
        });

    }
}

export default new InitCategories();
