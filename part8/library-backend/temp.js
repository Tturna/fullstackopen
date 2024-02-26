const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
require('dotenv').config()

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: "65dcbe6d4f2fbeeb6c7e50bd",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: "65dcbe6d4f2fbeeb6c7e50bd",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: "65dcbe6d4f2fbeeb6c7e50be",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: "65dcbe6d4f2fbeeb6c7e50c0",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: "65dcbe6d4f2fbeeb6c7e50c1",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: "65dcbe6d4f2fbeeb6c7e50bf",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: "65dcbe6d4f2fbeeb6c7e50bf",
    genres: ['classic', 'revolution']
  },
]

mongoose.set('strictQuery', false)
console.log('connecting...')
mongoose.connect(process.env.TEST_CONN_STRING)
.then(() => {
    console.log('connected to test db!')
    console.log('Deleting data...')

    Promise.all([
      // Author.deleteMany({}),
      Book.deleteMany({})
    ])
    .then(() => {
      console.log('Data deleted.')
      // console.log('Adding authors...')

      // Author.insertMany(authors)
      // .then(() => {
      //     console.log('Authors added.')
          console.log('Adding books...')
          Book.insertMany(books)
          .then(() => {
            console.log('Books added.')
          })
          .catch(e => {
            console.log(e)
          })
      // })
      // .catch(e => {
      //     console.log(e)
      // })
    })
    .catch(e => {
      console.log(e)
    })
})
.catch(e => {
    console.log(e)
})