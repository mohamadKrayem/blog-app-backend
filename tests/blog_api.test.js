const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

const BlogsInDb = async () => {
	let newBlogs = await Blog.find({})
	return newBlogs.map(blog => blog.toJSON())
}

test('all blogs are returned' , async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(2)
}, 100000)

test('all blogs has id', async () => {
	const response = await api.get('/api/blogs');

	response.body.forEach((res) => {
		console.log(response.body)
		return expect(res.id).toBeDefined()
	})
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10
	}
	const blogsAtStart = await BlogsInDb();

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const BlogsAtEnd = await BlogsInDb();
	expect(BlogsAtEnd).toHaveLength(blogsAtStart.length + 1)

})

test('check the id', async () => {
	const blogs = await BlogsInDb();
	await blogs.forEach(element => {
		if(!element.likes) element.likes = 0
	})

	const id = await blogs.map(element => element.likes)
	expect(id).toHaveLength(blogs.length)
}, 100000)

test('check title and url', async () => {
	const newBlog = {
		author: "Robert C. Martin",
		likes: 10
	}
	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400);
},100000)