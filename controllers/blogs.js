const Blog = require('../models/blog');
const app = require('express').Router();

app.get('/', (request, response) => {
  response.send("<h1>Blog App</h1>")
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app;