
const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('Async operation 1...');
		resolve(1);
		// reject(new Error('Something going wrong...'));
	}, 2000);
});

const p2 = new Promise((resolve) => {
	setTimeout(() => {
		console.log('Async operation 2...');
		resolve(2);
	}, 2000);
});

Promise.all([p1, p2])
	.then(result => console.log('Result of promise.all: ', result))
	.catch(err => console.log(err));

Promise.race([p1, p2]) // ! display first complete Promise
	.then(result => console.log('Result of promise race: ', result))
	.catch(err => console.log(err));