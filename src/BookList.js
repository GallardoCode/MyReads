/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookList extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    shelves: PropTypes.arrayOf(PropTypes.object),
    onUpdateBookShelf: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shelves: [
      { shelf: 'currentlyReading', name: 'Currently Reading' },
      { shelf: 'wantToRead', name: 'Want to Read' },
      { shelf: 'read', name: 'Read' },
      { shelf: undefined, name: 'Empty' },
    ],
  }

  //
  shelvesUsed = books => {
    const shelvesArray = books
      // get array of shelves being used in books
      .reduce((acc, v) => {
        const { shelf } = v
        if (acc.indexOf(shelf) === -1) {
          acc.push(shelf)
        }
        return acc
      }, [])
      // Assign a name to display to each shelf if available
      .map(shelf => {
        return this.getShelfName(shelf)
      })
    // order shelves same as props
    return this.orderShelves(shelvesArray)
  }

  getShelfName = shelf => {
    const { shelves } = this.props
    // if shelf is in the props give it prop name otherwise name is the same as shelf
    const foundShelf = shelves.filter(shelfObj => shelfObj.shelf === shelf)
    return foundShelf.length ? foundShelf[0] : { shelf, name: shelf }
  }

  // orders shevles in the order of a given props, if the shelf isn't in the props it goes at the bottom
  orderShelves = shelvesArray => {
    const { shelves } = this.props
    const propsOrder = shelves.map(shelf => shelf.shelf)
    shelvesArray.sort((a, b) => {
      const aEl = a.shelf
      const bEl = b.shelf
      // if shelf isn't in prop, put at the end of array
      if (propsOrder.indexOf(bEl) < 0) return -1
      if (propsOrder.indexOf(aEl) < 0) return 1
      // Order shelves to match prop
      return propsOrder.indexOf(aEl) < propsOrder.indexOf(bEl) ? -1 : 1
    })

    return shelvesArray
  }

  updateShelves = shelves => {
    this.setState(() => shelves)
  }

  render() {
    const { books, onUpdateBookShelf } = this.props
    const orderedShelves = books.length && this.shelvesUsed(books)
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {orderedShelves &&
              orderedShelves.map(shelf => (
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
