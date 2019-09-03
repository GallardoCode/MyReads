/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
  }

  state = {
    shelves: [],
  }

  componentDidUpdate(prevProps) {
    const { books } = this.props
    if (books !== prevProps.books) {
      const shelvesArray = books.reduce((acc, v) => {
        if (acc.indexOf(v.shelf) === -1) {
          acc.push(v.shelf)
        }
        return acc
      }, [])

      this.updateShelves({ shelves: shelvesArray })
    }
  }

  updateShelves = shelves => {
    this.setState(() => shelves)
  }

  render() {
    const { shelves } = this.state
    const { books, onUpdateBookShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map(shelf => (
              <BookShelf
                shelf={shelf}
                books={books}
                onUpdateBookShelf={onUpdateBookShelf}
                key={shelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button type="button">Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default BookList
