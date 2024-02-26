const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')

const CONN_STRING = process.env.NODE_ENV === 'test' ? process.env.TEST_CONN_STRING : process.env.CONN_STRING
mongoose.set('strictQuery', false)

console.log(`Connecting to ${process.env.NODE_ENV} db...`)

mongoose.connect(CONN_STRING)
.then(() => {
  console.log('Connected to db!')
})
.catch(e => {
  console.log(e)
})

// GraphQL Schema
const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    allBooks (author: String, genre: String): [Book!]!,
    bookCount: Int!,
    allAuthors: [Author!]!,
    authorCount: Int!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    allBooks: async (_root, args) => {
      
      let filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (!author) {
          return null
        }

        filter.author = author._id
      }

      let response = await Book.find(filter).populate('author')

      // if (args.author) {
      //   response = response.filter(b => {
      //     return b.author === args.author
      //   })
      // }

      if (args.genre) {
        response = response.filter(b => {
          return b.genres.includes(args.genre)
        })
      }

      return response
    },
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({})
      const books = await Book.find({})

      return authors.map(a => { 
        let ao = {
          ...a._doc,
          bookCount: (books.filter(b => {
            return b.author.toString() === a._id.toString()
          })).length
        }

        return ao
      })
    },
    authorCount: async () => Author.collection.countDocuments()
  },
  Mutation: {
    addBook: async (_root, args) => {
      const newBook = new Book({ ...args })
      let existingAuthor = await Author.findOne({ name: args.author })

      if (!existingAuthor) {
        const newAuthor = new Author({
          name: args.author
        })

        existingAuthor = await newAuthor.save()
      }
      newBook.author = existingAuthor._id

      await newBook.save()
      return Book.findById(newBook._id).populate('author')
    },
    editAuthor: async (_root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) return null

      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
