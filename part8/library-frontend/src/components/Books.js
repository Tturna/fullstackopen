import { useState } from 'react'
import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS_GENRES, BOOKS_IN_GENRE } from "../queries"

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const genresResult = useQuery(ALL_BOOKS_GENRES)
  const [getBooks, booksResult] = useLazyQuery(BOOKS_IN_GENRE)

  if (!props.show) {
    return null
  }
  
  if (genresResult.loading || (booksResult.called && booksResult.loading)) return <div>Loading...</div>

  const genresAll = genresResult.data.allBooks.map(b => b.genres)
  const uniqueGenres = [...new Set(genresAll.flat())]

  const GenreButton = ({g}) => {
    return(
      <button onClick={() => {
        setGenre(g)
        getBooks({ variables: { genre: g }})
      }}
      >{g ? g : 'all genres'}</button>
    )
  }

  const GenreList = () => {
    return(uniqueGenres
      .map(g => <GenreButton key={g} g={g} />)
      .concat(<GenreButton key={'all'} g={''} />))
  }

  const BookList = () => {
    if (!booksResult.data) return null

    const books = booksResult.data.allBooks

    return (
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h2>Books</h2>

      {genre ? <p>in genre: <strong>{genre}</strong></p> : null}

      <GenreList />
      <BookList />
    </div>
  )
}

export default Books
