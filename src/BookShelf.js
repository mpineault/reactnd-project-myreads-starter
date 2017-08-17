import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const { updating, books, onUpdateBook, bookShelfTitle } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={onUpdateBook}
                  updating={updating}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
