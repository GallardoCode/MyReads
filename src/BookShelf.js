import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelf: PropTypes.string.isRequired,
  }

  nameSwitch = param => {
    switch (param) {
      case 'currentlyReading':
        return 'Currently Reading'
      case 'wantToRead':
        return 'Want to Read'
      case 'read':
        return 'Read'
      case 'none':
        return 'None'
      default:
        return param
    }
  }

  render() {
    const { shelf, books } = this.props
    const shelfBooks = books.filter(book => book.shelf === shelf)
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.nameSwitch(shelf)}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map(book => (
              <Book book={book} key={book.id} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
