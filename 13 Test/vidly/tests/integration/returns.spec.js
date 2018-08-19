const Rental = require('../../models/rental');
const mongoose = require('mongoose');
const request = require('supertest');
const User = require('../../models/user');

describe('/api/returns', () => {
	let server = null;
	let customerId;
	let filmId;
	let rental;
	let token;

	beforeEach(async () => { 
		server = require('../../index');
		customerId = mongoose.Types.ObjectId();
		filmId = mongoose.Types.ObjectId();
		token = new User().generateAuthToken();

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
		await Rental.remove({}); // * remove all from genre collection
		await server.close();
	});

	it('should return 401 if user not login', async() => {
		const res = await request(server)
			.post('/api/returns')
			.send({customerId, filmId});
		expect(res.status).toBe(401);
	});


	it('should return 400 if customer id is not provided', async() => {
		customerId = '';

		const res = await request(server)
			.post('/api/returns')
			.set('x-auth-token', token)
			.send({customerId, filmId});
		expect(res.status).toBe(400);
	});

	it('should return 400 if film id is not provided', async() => {
		filmId = '';

		const res = await request(server)
			.post('/api/returns')
			.set('x-auth-token', token)
			.send({customerId, filmId});
		expect(res.status).toBe(400);
	});

});
