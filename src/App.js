import React from 'react'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import BookSearch from './BookSearch'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
      }))
    })
  }

  searchBooks = query => {
    const { books } = this.state
    if (!query) {
      this.clearSearchBooks()
    } else {
      BooksAPI.search(query).then(resBooks => {
        if (resBooks && resBooks.length) {
          const searchBooks = resBooks.filter(
            resBook => !books.find(book => book.id === resBook.id)
          )
          this.setState(() => ({
            searchBooks,
          }))
        } else {
          this.clearSearchBooks()
        }
      })
    }
  }

  clearSearchBooks = () => {
    this.setState(() => ({
      searchBooks: [],
    }))
  }

  updateBookShelf = (book, shelf) => {
    const { books } = this.state
    // if book has an existing shelf, update shelf in existing state array, else add it to new to the array
    const newBooks = book.shelf
      ? books.map(stateBook =>
          stateBook.id === book.id ? { ...stateBook, shelf } : stateBook
        )
      : [...books, { ...book, shelf }]
    BooksAPI.update(book, shelf).then(() => {
      this.setState(() => ({
        books: newBooks,
      }))
      this.removeFromSearch(book)
    })
  }

  removeFromSearch = book => {
    const { searchBooks } = this.state
    const newSearchBooks =
      searchBooks.length > 0
        ? searchBooks.filter(searchBook => searchBook.id !== book.id)
        : []
    this.setState(() => ({ searchBooks: newSearchBooks }))
  }

  render() {
    const { books, searchBooks } = this.state
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={books} onUpdateBookShelf={this.updateBookShelf} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              searchBooks={searchBooks}
              onSearchBooks={this.searchBooks}
              onUpdateBookShelf={this.updateBookShelf}
              onClearSearchBooks={this.clearSearchBooks}
            />
          )}
        />
      </div>
    )
  }
}
export default BooksApp
