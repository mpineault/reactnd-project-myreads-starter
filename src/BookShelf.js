import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    const bookShelfTitle = this.props.bookShelfTitle
    const books = this.props.books
    const onUpdateBookShelf = this.props.onUpdateBookShelf
    const updating = this.props.updating

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookShelf={onUpdateBookShelf}
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
