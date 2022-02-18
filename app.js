const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger');
const { mongoUrl, PORT } = require('./utils/config');
const blogsRouter = require('./controllers/blogs')

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  })

app.use(cors())
app.use(express.json())

app.use('/',blogsRouter);

module.exports = app;