const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const midware = require('./utils/middleware.js')
const blogsRouter = require('./controllers/blogs.js')
const app = express()

mongoose.set('strictQuery', false)

logger.info('Connecting to db...')
mongoose.connect(config.CONN_STRING)
    .then(() => {
        logger.info('Connected to db!')
    })
    .catch(e => {
        logger.error(e)
    })

app.use(cors())
app.use(express.json())
app.use(midware.requestLogger)
app.use('/api/blogs/', blogsRouter)
app.use(midware.unknownEndpoint)
app.use(midware.errorHandler)

module.exports = app