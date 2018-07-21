const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
	name: String,
	author: String, 
	tags: [ String ],
	date: Date, 
	isPublished: Boolean,
	price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
	return await Course
		.find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } }) // $in and .or in this code do the same things
		// .or([{tags: 'backend'}, {tags: 'frontend'}])
		.or([ 
			{ price: {$gte: 15} },
			{ name: /.*by.*/i }
		]) // get all courses with price >= 15 || name.match('by')
		.sort({ price: -1 }) // or use .sort('-price')
		.select({ name: 1, author: 1, price: 1}); // or .select('name author price name');
}

async function run() {
	const courses = await getCourses();
	console.log(courses);
}

run();
