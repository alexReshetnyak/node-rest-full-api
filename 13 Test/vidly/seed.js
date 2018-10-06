const { Genre } = require("./models/genre");
const  Film  = require("./models/film");
const mongoose = require("mongoose");
const config = require("config");

const data = [
	{
		name: "Comedy",
		films: [
			{ title: "Airplane", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "The Hangover", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2 }
		]
	},
	{
		name: "Action",
		films: [
			{ title: "Die Hard", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "Terminator", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "The Avengers", numberInStock: 15, dailyRentalRate: 2 }
		]
	},
	{
		name: "Romance",
		films: [
			{ title: "The Notebook", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2 }
		]
	},
	{
		name: "Thriller",
		films: [
			{ title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2 },
			{ title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2 },
			{ title: "The Others", numberInStock: 15, dailyRentalRate: 2 }
		]
	}
];

async function seed() {
	await mongoose.connect(config.get('dbPath'));
	
	await Film.deleteMany({});
	await Genre.deleteMany({});

	for (let genre of data) {
		const { _id: genreId } = await new Genre({ name: genre.name }).save();
		const films = genre.films.map(film => ({
			...film,
			genre: { _id: genreId, name: genre.name }
		}));
		await Film.insertMany(films);
	}

	mongoose.disconnect();

	console.info('Done!');
}

seed();
