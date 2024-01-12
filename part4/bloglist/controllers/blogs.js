const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js');
const User = require('../models/user.js');

const getTokenFrom = request => {
    // This gets the value of the Authorization header in the HTTP request
    const authorization = request.get('authorization');

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '');
    }

    return null;
}

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
    const blogs = await Blog.find({}).populate('creator');
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const token = getTokenFrom(request);

    if (!token) {
        return response.status(401).json({ error: 'token missing' });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }
    
    const creator = await User.findById(decodedToken.id);
    console.log(creator);

    // We're not calling hasOwnProperty directly on the body object because
    // it can be shadowed by a property with the same name.
    if (!Object.prototype.hasOwnProperty.call(body, 'likes')) {
        body.likes = 0;
    }

    if (!Object.prototype.hasOwnProperty.call(body, 'title') ||
        !Object.prototype.hasOwnProperty.call(body, 'url')) {
            response.sendStatus(400);
        }
    
    let blogData = {...body};
    blogData.creator = creator.id;

    const blog = new Blog(blogData);
    const result = await blog.save();

    creator.blogs = creator.blogs.concat(blog._id);
    await creator.save();

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