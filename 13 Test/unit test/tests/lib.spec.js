const { absolute } = require('../lib');
const { greet } = require('../lib');
const { getCurrencies } = require('../lib');
const { getProduct } = require('../lib');
const { registerUser } = require('../lib');
const { applyDiscount } = require('../lib');
const { notifyCustomer } = require('../lib');

const db = require('../db');
const mail = require('../mail');

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

describe('applyDiscount', () => {
	it('should apply discount if customer has more than 10 points', () => {
		db.getCustomerSync = function(customerId) { // fake function 
			console.log('Fake reading customer');
			return { id: customerId, points: 20 };
		};

		const order = { customerId: 1, totalPrice: 10 };
		applyDiscount(order);

		expect(order.totalPrice).toBe(9);
	});
});


describe('notifyCustomer', () => {
	it('should send email to customer', () => {
		// const mockFunction = jest.fn();
		// mockFunction.mockReturnValue(1);
		// mockFunction.mockResolvedValue(1); // async mock function
		// mockFunction.mockRejectedValue(new Error('...'));
		// const result = await mockFunction();

		db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
		mail.send = jest.fn();

		notifyCustomer({ customerId: 1 });

		expect(mail.send).toHaveBeenCalled();
		console.log('CALLS:', mail.send.mock.calls);
		
		expect(mail.send.mock.calls[0][0]).toBe('a');
		expect(mail.send.mock.calls[0][1]).toMatch(/order/);
	});
});