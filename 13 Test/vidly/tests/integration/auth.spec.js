const request = require('supertest');
const User = require('../../models/user');
const { Genre } = require('../../models/genre');


describe('auth middleware', () => {
	let server = null;

	beforeEach(() => server = require('../../index'));
	afterEach(async () => {
		await Genre.remove({});
		await server.close();
	});

	let token;

	const exec = () => {
		return request(server)
			.post('/api/genres')
			.set('x-auth-token', token)
			.send({ name: 'genre' });
	};

	beforeEach(() => {
		token = new User().generateAuthToken();
	});

	it('should return 401 if no token no provided', async () => {
		token = '';

		const res = await exec();
		expect(res.status).toBe(401);
		// expect(true).toBe(true); // * because app.server.listen error
	});

	it('should return 400 if no token invalid', async () => {
		token = 'a';

		const res = await exec();
		expect(res.status).toBe(400);
	});

	it('should return 200 if no token is valid', async () => {
		const res = await exec();
		expect(res.status).toBe(200);
	});
});