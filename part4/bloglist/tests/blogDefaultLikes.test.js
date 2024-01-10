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

test('if likes are missing from a POST request, default to 0', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'Tristram Shandy',
            author: 'Laurence Sterne',
            url: 'https://www.goodreads.com/book/show/1076.The_Life_and_Opinions_of_Tristram_Shandy_Gentleman'
        })
        .expect(201);
    
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);

    const newBlog = response.body[initialBlogs.length];
    expect(newBlog.likes).toBe(0);
});

afterAll(async () => {
    await mongoose.connection.close();
})