const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    allBooks (author: String, genre: String): [Book!]!,
    bookCount: Int!,
    allAuthors: [Author!]!,
    authorCount: Int!,
    me: User
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
    ): Author,

    createUser(
      username: String!
      favoriteGenre: String!
    ): User,

    login(
      username: String!
      password: String!
    ): Token
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
    authorCount: async () => Author.collection.countDocuments(),
    me: (_root, _args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login required', {
          extensions: {
            code: 'UNAUTHORIZED'
          }
        })
      }

      const newBook = new Book({ ...args })
      let existingAuthor = await Author.findOne({ name: args.author })

      if (!existingAuthor) {
        const newAuthor = new Author({
          name: args.author
        })

        try {
          existingAuthor = await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Error creating new author', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      newBook.author = existingAuthor._id

      try {
        await newBook.save()
      } catch (error) {
        throw new GraphQLError('Error adding book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      return Book.findById(newBook._id).populate('author')
    },
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('Login required', {
          extensions: {
            code: 'UNAUTHORIZED'
          }
        })
      }

      const author = await Author.findOne({ name: args.name })

      // Maybe this should throw an error too?
      if (!author) return null

      author.born = args.setBornTo

      return author.save()
    },
    createUser: async (_root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      try {
        return user.save()
      } catch (error) {
        throw new GraphQLError('Error creating user', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error
          }
        })
      }
    },
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'pasd') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.TOKEN_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.startsWith('Bearer')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.TOKEN_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
