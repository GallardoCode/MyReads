import React from 'react'
import PropTypes from 'prop-types'

export default function Book({ book, onUpdateBookShelf }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf}
              onChange={e => onUpdateBookShelf(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors.map(author => (
          <div className="book-authors" key={author}>
            {author}
          </div>
        ))}
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
    imageLinks: PropTypes.objectOf(PropTypes.string),
    shelf: PropTypes.string,
  }).isRequired,
  onUpdateBookShelf: PropTypes.func.isRequired,
}
