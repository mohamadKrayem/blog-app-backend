const Blog = require('../models/blog');
const app = require('express').Router();

app.get('/', (request, response) => {
  response.send("<h1>Blog App</h1>")
})

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs.map(blog => blog.toJSON()))
})

app.post('/api/blogs', async (request, response) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
})

app.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

module.exports = app;