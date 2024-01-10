const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');

const initialBlogs = [
    {
        title: 'Bleak House',
        author: 'Charles Dickens',
        url: 'https://www.goodreads.com/book/show/5297.Bleak_House',
        likes: 10
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        url: 'https://www.goodreads.com/book/show/4671.The_Great_Gatsby',
        likes: 20
    }
];

beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(initialBlogs);
});

const api = supertest(app);

test('New blog is added correctly', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'The Catcher in the Rye',
            author: 'J.D. Salinger',
            url: 'https://www.goodreads.com/book/show/5107.The_Catcher_in_the_Rye',
            likes: 30
        });
    
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
    
    const newBlog = response.body[initialBlogs.length];
    expect(newBlog.title).toBe('The Catcher in the Rye');
});

afterAll(async () => {
    await mongoose.connection.close();
});