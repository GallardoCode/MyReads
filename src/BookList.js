/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

const shelfOrder = ['currentlyReading', 'wantToRead', 'read']
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
      // Get available shelves from books
      const shelvesArray = books
        .reduce((acc, v) => {
          if (acc.indexOf(v.shelf) === -1) {
            acc.push(v.shelf)
          }
          return acc
        }, [])
        // Assign a name to display to each shelf if available
        .map(shelf => {
          return { shelf, name: this.shelfNameSwitch(shelf) }
        })
      this.updateShelves({
        shelves: this.orderShelves(shelvesArray, shelfOrder),
      })
    }
  }

  shelfNameSwitch = param => {
    switch (param) {
      case 'currentlyReading':
        return 'Currently Reading'
      case 'wantToRead':
        return 'Want to Read'
      case 'read':
        return 'Read'
      default:
        return param
    }
  }

  // orders shevles in the order of a given array, if the shelf isn't in the array it goes at the bottom
  orderShelves = (shelves, shelvesOrderArr) => {
    shelves.sort((a, b) => {
      const aEl = a.shelf
      const bEl = b.shelf
      // if shelf isn't in in shelvesOrderArr, put at the end of array
      if (shelvesOrderArr.indexOf(bEl) < 0) return -1
      if (shelvesOrderArr.indexOf(aEl) < 0) return 1
      // Order shelves to match shelvesOrderArr
      return shelvesOrderArr.indexOf(aEl) < shelvesOrderArr.indexOf(bEl)
        ? -1
        : 1
    })

    return shelves
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
                key={shelf.shelf}
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
