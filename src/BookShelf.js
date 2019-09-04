import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

function BookShelf({ books, shelf, onUpdateBookShelf }) {
  const shelfBooks = books.filter(book => book.shelf === shelf.shelf)
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map(book => (
            <Book
              book={book}
              key={book.id}
              onUpdateBookShelf={onUpdateBookShelf}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  shelf: PropTypes.objectOf(PropTypes.string).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired,
}

export default BookShelf
