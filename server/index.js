// Get environment variables
require('dotenv').config()

// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// Register our DynamoDB interface
// fastify.register(require('./services/database'))

// Register CORS handler
fastify.register(require('fastify-cors'), {
  // put your options here
  origin: '*'
})

fastify.register(require('fastify-cookie'))

// Routes
const job = require('./routes/job')

// Register route handlers
fastify.register(job, { prefix: '/job' })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8080, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()