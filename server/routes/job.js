const bullmq = require('bullmq')

const myQueue = new bullmq.Queue('OCR', { connection: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
}});

module.exports = function (fastify, opts, next) {

    fastify.get('/', async (request, reply) => {
        return "Hello job"
    })

    fastify.post('/', async (request, reply) => {
        myQueue.add('cars', { color: 'blue' });
        return "Hello job"
    })

    next()
}