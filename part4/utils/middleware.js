const logger = require('./logger.js')

const requestLogger = (request, _response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, _req, res, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}