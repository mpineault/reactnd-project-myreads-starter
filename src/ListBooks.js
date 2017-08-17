import React, { Component } from 'react'
import sortBy from 'sort-by'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  render() {
    const bookCollections = [
      {
        type: 'Currently Reading',
        books: (this.props.books.filter((book) => book.shelf === "currentlyReading")).sort(sortBy('title'))
      },
      {
        type: 'Want to Read',
        books: (this.props.books.filter((book) => book.shelf === "wantToRead")).sort(sortBy('title'))
      },
      {
        type: 'Read',
        books: (this.props.books.filter((book) => book.shelf === "read")).sort(sortBy('title'))
      }
    ]
    const { updating, onUpdateBook } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookCollections.map((collection) => (
              <BookShelf
                key={collection.type}
                bookShelfTitle={collection.type}
                books={collection.books}
                onUpdateBook={onUpdateBook}
                updating={updating}
                 />
           ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
