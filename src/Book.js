import React from 'react'
import PropTypes from 'prop-types'

export default function Book({ book, onUpdateBookShelf, shelves }) {
  let bookImgStlye = { width: 128, height: 193 }
  bookImgStlye = book.imageLinks
    ? { ...bookImgStlye, backgroundImage: `url(${book.imageLinks.thumbnail})` }
    : bookImgStlye
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={bookImgStlye}></div>
          <div className="book-shelf-changer">
            <select
              value={book.shelf ? book.shelf : 'none'}
              onChange={e => onUpdateBookShelf(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              {!book.shelf ? (
                <option value="none" disabled>
                  None
                </option>
              ) : null}
              {shelves.map(shelf => (
                <option key={shelf.shelf} value={shelf.shelf}>
                  {shelf.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors
          ? book.authors.map(author => (
              <div className="book-authors" key={author}>
                {author}
              </div>
            ))
          : null}
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
  shelves: PropTypes.arrayOf(PropTypes.object),
}

Book.defaultProps = {
  shelves: [
    { shelf: 'currentlyReading', name: 'Currently Reading' },
    { shelf: 'wantToRead', name: 'Want to Read' },
    { shelf: 'read', name: 'Read' },
  ],
}
