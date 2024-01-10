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

test('uid is named id and not _id', async () => {
    const response = await api.get('/api/blogs');
    console.log(response.body[0]);
    expect(response.body[0].id).toBeDefined(); 
});

afterAll(async () => {
    await mongoose.connection.close();
});