const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');

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
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {

    // We're not calling hasOwnProperty directly on the request.body object because
    // it can be shadowed by a property with the same name.
    if (!Object.prototype.hasOwnProperty.call(request.body, 'likes')) {
        request.body.likes = 0;
    }

    if (!Object.prototype.hasOwnProperty.call(request.body, 'title') ||
        !Object.prototype.hasOwnProperty.call(request.body, 'url')) {
            response.sendStatus(400);
        }

    const blog = new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;

    const deleted = await Blog.findByIdAndRemove(id);
    
    if (!deleted) {
        return response.status(400).json({ error: 'Invalid id' });
    }

    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id;
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updated = await Blog.findByIdAndUpdate(id, blog, { new: true });
    response.json(updated);
});

module.exports = blogsRouter