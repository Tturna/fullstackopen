const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

// blogsRouter.get('/', (_request, response, next) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
//         .catch(e => {
//             next(e)
//         })
// })

// We don't need to handle errors here because we use express-async-errors
blogsRouter.get('/', async (_request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', (request, response) => {

    // default likes
    if (!request.body.hasOwnProperty('likes')) {
        request.body.likes = 0;
    }

    const blog = new Blog(request.body)
    const result = blog.save();
    response.status(201).json(result);
})

module.exports = blogsRouter