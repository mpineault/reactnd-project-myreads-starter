import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { book, updating, onUpdateBook } = this.props

    return (
      <div className="book">
        <div className="book-top">
          {(book.imageLinks && book.imageLinks.smallThumbnail)
            ? (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.smallThumbnail + '")' }}></div>)
            : (<div className="book-cover" style={{ width: 128, height: 193 }}><div className="book-cover-title">{book.title}</div></div>)
          }
          <div className={"book-shelf-changer " + (updating ? 'hidden' : '')}>
            <select
              onChange={(e) => onUpdateBook(book, e.target.value)}
              value={(book.shelf) ? book.shelf : ""}
              disabled={updating}
              style={{ cursor: ((updating) ? 'default' : 'pointer') }}
              >
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {
            (book.authors && book.authors.length > 0)
            && book.authors.map((author, key) =>
              (<span key={author}>
                {((book.authors.length > 1 && (key + 1) < book.authors.length) ? author + ', ': author)}
              </span>)
            )
          }
        </div>
      </div>
    )
  }
}

export default Book
