import { useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { BOOKS_IN_GENRE, CURRENT_USER_FAV_GENRE } from "../queries"

const Books = (props) => {
  const favGenreResult = useQuery(CURRENT_USER_FAV_GENRE)
  const [getBooks, booksResult] = useLazyQuery(BOOKS_IN_GENRE)

  useEffect(() => {
    if (favGenreResult.data && favGenreResult.data.me) {
      getBooks({ variables: { genre: favGenreResult.data.me.favoriteGenre } })
    }
  }, [favGenreResult.data, getBooks])

  if (!props.show) {
    return null
  }

  if (favGenreResult.loading || (booksResult.called && booksResult.loading)) return <div>Loading...</div>

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

      <p>in your favorite genre <strong>{favGenreResult.data.me.favoriteGenre}</strong></p>

      <BookList />
    </div>
  )
}

export default Books
