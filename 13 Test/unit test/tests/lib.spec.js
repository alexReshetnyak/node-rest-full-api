const { absolute } = require('../lib');
const { greet } = require('../lib');
const { getCurrencies } = require('../lib');
const { getProduct } = require('../lib');
const { registerUser } = require('../lib');

describe('absolute', () =>{
	it('should return a positive number if input is negative', () => {
		const result =  absolute(-1);
		expect(result).toBe(1);
	});
	
	it('should return a positive number if input is positive', () => {
		const result =  absolute(1);
		expect(result).toBe(1);
	});
	
	it('should return 0 if input is 0', () => {
		const result =  absolute(0);
		expect(result).toBe(0);
	});
});


describe('greet', () =>{
	it('should return a greeting message', () => {
		const result =  greet('Alex');
		expect(result).toMatch(/Alex/);
		expect(result).toContain('Alex'); // * The same as toMatch
	});
});

describe('getCurrencies', () =>{
	it('should return supported currencies', () => {
		const result =  getCurrencies();
		expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']));
	});
});

describe('getProduct', () =>{
	it('should return product with given ID', () => {
		const result =  getProduct(1);
		expect(result).toEqual({id: 1, price: 10}); // * strong match
		expect(result).toMatchObject({id: 1, price: 10}); // * Object should contain this properties
		expect(result).toHaveProperty('id', 1);
	});
});

describe('registerUser', () =>{
	it('should throw if user name is falsy', () => {
		const args = [null, undefined, 0, '', false, NaN];

		args.forEach(a => {
			expect(() => {
				registerUser(null);
			}).toThrow();
		});	
	});

	it('should return a user object if valid user name is passed', () => {
		const result = registerUser('Alex');
		expect(result).toMatchObject({username: 'Alex'});
		expect(result.id).toBeGreaterThan(0);
	});
});
