const Rental = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');

describe('/api/returns', () => {
	let server;
	let customerId;
	let filmId;
	let rental;

	beforeEach(async () => { 
		server = require('../../index');
		customerId = mongoose.Types.ObjectId();
		filmId = mongoose.Types.ObjectId();

		rental = new Rental({
			customer: {
				_id: customerId,
				name: '12345',
				phone: '12345'
			},
			film: {
				_id: filmId,
				title: '12345',
				dailyRentalRate: 2
			}
		});

		await rental.save();
	});

	afterEach(async () => {
		await server.close();
		await Rental.remove({}); // * remove all from genre collection
	});

	it('should return 401 if user not login', async() => {
		const res = await request(server)
			.post('/api/returns')
			.send({customerId, filmId});
		expect(res.status).toBe(401);
	});



});
