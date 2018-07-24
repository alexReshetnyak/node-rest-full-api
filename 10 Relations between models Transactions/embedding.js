const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('Connected to MongoDB...'))
	.catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
	name: String,
	bio: String,
	website: String
});

const Author = mongoose.model('Author', authorSchema);

// const Course = mongoose.model('Course', new mongoose.Schema({
// 	name: String,
// 	author: { // * added author to course model
// 		type: authorSchema,
// 		required: true
// 	}
// }));

const Course = mongoose.model('Course', new mongoose.Schema({
	name: String,
	authors: { // * added author to course model
		type: [authorSchema],
		required: true
	}
}));

async function createCourse(name, authors) {
	const course = new Course({
		name, 
		authors
	}); 
	
	const result = await course.save();
	console.log(result);
}

async function listCourses() { 
	const courses = await Course.find();
	console.log(courses);
}

async function addAuthor(courseId, author) { // Add new author to course
	const course = await Course.findById(courseId);
	course.authors.push(author);
	course.save();
}

async function removeAuthor(courseId, authorId) { // Remove author to course
	const course = await Course.findById(courseId);
	const author = course.authors.id(authorId);
	author.remove();
	course.save();
}

async function updateAuthor(courseId) { // * update Author inside Course
	const course = await Course.findById(courseId);
	course.author.name = 'Alexey Reshetnyak';
	course.save();
}

async function updateAuthor2(courseId) { // * update Author inside Course
	const course = await Course.update(
		{_id: courseId},
		{
			$set: {
				'author.name': 'John Smith'
			},
			// $unset: { // * Remove model or model.property
			// 	'author': ''
			// }
		}
	);
}

// updateAuthor2('5b533ede49ed8b5dd03a98dc');

// createCourse('Node Course', [
// 	new Author({ name: 'Mosh' }),
// 	new Author({ name: 'Alex' })
// ]);
// addAuthor('5b534524b70cf261d2769555', new Author({ name: 'Vika' }));