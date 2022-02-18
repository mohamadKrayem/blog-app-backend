const http = require('http')
const app = require('./app')
const cors = require('cors')
const logger = require('./utils/logger');
const { mongoUrl, PORT } = require('./utils/config');
const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})