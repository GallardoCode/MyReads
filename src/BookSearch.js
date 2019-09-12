import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookSearch extends Component {
  static propTypes = {
    searchBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSearchBooks: PropTypes.func.isRequired,
    onUpdateBookShelf: PropTypes.func.isRequired,
    onClearSearchBooks: PropTypes.func.isRequired,
  }

  state = {
    query: '',
  }

  timeoutId = null

  updateQuery = query => {
    const { onSearchBooks } = this.props
    // debounce ajax search query for better performance
    window.clearTimeout(this.timeoutId)
    this.timeoutId = window.setTimeout(() => {
      onSearchBooks(query)
    }, 500)
    this.setState(() => ({
      query,
    }))
  }

  render() {
    const { query } = this.state
    const { searchBooks, onUpdateBookShelf, onClearSearchBooks } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" onClick={onClearSearchBooks}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={e => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {searchBooks.length ? (
            <BookShelf
              shelf={{ shelf: undefined, name: 'Search' }}
              onUpdateBookShelf={onUpdateBookShelf}
              books={searchBooks}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default BookSearch
