import React from 'react'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
      }))
    })
  }

  updateBookShelf = (book, shelf) => {
    const { books } = this.state
    const newBooks = books.map(el =>
      el.id === book.id ? { ...el, shelf } : el
    )
    BooksAPI.update(book, shelf).then(
      this.setState(() => ({
        books: newBooks,
      }))
    )
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={books} onUpdateBookShelf={this.updateBookShelf} />
          )}
        />
        <Route path="/search" component={BookSearch} />
      </div>
    )
  }
}
export default BooksApp
