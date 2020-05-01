const bcryptjs = require('bcryptjs');
const ObjectId = require('bson/lib/bson/objectid');

module.exports = {
	User: [
		{
			_id: ObjectId('54759eb3c090d83494e2d804'),
			email: 'dev@ch.eu',
			phoneNumber: '1234567890',
			firstName: 'John',
			lastName: 'Doe',
			passwordHash: bcryptjs.hashSync('develop', 10),
		}
	],
	Category: [
		{
			_id: ObjectId('54759eb3c090d83494e2d111'),
			name: 'Kurierdienste',
			description: ' ',
			internal_id: 1,
		},
		{
			_id: ObjectId('54759eb3c090d83494e2d112'),
			name: 'Warenleistungen',
			description: ' ',
			internal_id: 2,
		},
		{
			_id: ObjectId('54759eb3c090d83494e2d113'),
			name: 'Bildung',
			description: ' ',
			internal_id: 3,
		},
		{
			_id: ObjectId('54759eb3c090d83494e2d114'),
			name: 'Soziales & Gemeinschaft',
			description: ' ',
			internal_id: 4,
		},
	],
	HelpRequest: [
		{
			title: 'Einkaufen',
			description: '1 mal pro Wock einkaufen gehen',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			}
		},
	],
};
