const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
require('dotenv').config();

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send("<h1>hello world</h1>")
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

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})