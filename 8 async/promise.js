
const p = new Promise((resolve, reject) => {
	// Some async work
	setTimeout(() => {
		resolve(1);
	}, 2000);

	// reject(new Error('message'));
});

p
	.then(result => console.log('Result: ', result))
	.catch(err => console.error('Error:', err.message));