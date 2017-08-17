import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import EmptyBook from './EmptyBook'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  timer = null

  componentDidMount () {
    this.props.onSearchBooks(this.state.query)
  }

  updateSearch(query) {
    this.props.onSearching()

    this.setState({
      query: query.trim()
    })

    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.props.onSearchBooks(query)
    }, 400)
  }

  render() {
    const { books, searching, updating, onUpdateBook } = this.props
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.updateSearch(e.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(searching && query.length > 0) &&
              <li>
                Searching...
              </li>
            }

            {(books && books.length > 0 && !searching) && books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBook={onUpdateBook}
                  updating={updating}
                />
              </li>
            ))}

            {(books.error && books.items.length <= 0 && !searching) &&
              <li>
                <EmptyBook/>
              </li>
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
