const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog')

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

test('Missing title returns 400', async () => {
    await api
        .post('/api/blogs')
        .send({
            author: "The Man Himself",
            url: "https://www.example.com",
            likes: 1
        })
        .expect(400);
});

test('Missing url returns 400', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: "Test Blog",
            author: "The Man Himself",
            likes: 1
        })
        .expect(400);
});