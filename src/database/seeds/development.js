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
		},
		{
			_id: ObjectId('54759eb3c090d83494e2d904'),
			email: 'dev2@ch.eu',
			phoneNumber: '0987654321',
			firstName: 'Jane',
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
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
		{
			title: 'Einkaufen',
			description: '1 mal pro Woche einkaufen gehen für meine schwerkranken Eltern',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-01'),
			time_end: new Date('2020-06-14')
		},
		{
			title: 'Eier, wir brauchen Eier',
			description: 'Mandelmilch wär auch gut',
			category: ObjectId('54759eb3c090d83494e2d112'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '1',
				street: 'Hintermzaun',
				plz: '1234',
				city: 'Nirgendwo',
			},
			time_start: new Date('2020-06-07'),
			time_end: new Date('2020-06-21')
		},
		{
			title: 'Mathe Nachhilfe',
			description: 'Abitur Niveau',
			category: ObjectId('54759eb3c090d83494e2d113'),
			created_by: ObjectId('54759eb3c090d83494e2d804'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2021-02-07'),
			time_end: new Date('2021-05-21')
		},
		{
			title: 'Fahrer 2 mal pro Woche',
			description: 'Ich brauch einen Fahrer, der meinen Sohn 2 mal pro Woche in den Musikunterricht fahren könnte. Bezahlt.',
			category: ObjectId('54759eb3c090d83494e2d111'),
			created_by: ObjectId('54759eb3c090d83494e2d904'),
			address: {
				street_nr: '2',
				street: 'Hinter der Hecke',
				plz: '4321',
				city: 'Nirvana',
			},
			time_start: new Date('2020-05-07'),
			time_end: new Date('2021-05-07')
		},
	],
};
