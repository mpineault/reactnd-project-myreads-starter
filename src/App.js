import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    updating: false,
    results: []
  }

  componentDidMount () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books })
      })
  }

  updateBookShelf (updateBook, shelf) {
    this.setState((state) => ({
      updating: true
    }))

    updateBook.shelf = shelf

    BooksAPI.update (updateBook, shelf)
      .then((book) => {
        this.setState((state) => ({
          books: state.books.map((book) => {
            book = (book.id === updateBook.id) ? updateBook : book
            return book
          }),
          updating: false
        }))
      })
  }

  searchBooks (query) {
    if(query.length > 0) {
      BooksAPI.search(query, 10)
        .then((books) => {
          this.setState((state) => ({
            results: books
          }))
        })
    } else {
      this.setState((state) => ({
        results: []
      }))
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updating={this.state.updating}
            onUpdateBookShelf={(book, shelf) => {
              this.updateBookShelf(book, shelf)
            }}
          />
        )}/>
      <Route path="/search" render={() => (
        <SearchBooks
          books={this.state.results}
          onSearchBooks={(query) => {
            this.searchBooks(query)
          }}
          updating={this.state.updating}
          onUpdateBookShelf={(book, shelf) => {
            this.updateBookShelf(book, shelf)
          }}
          />
      )}/>
      </div>
    )
  }
}

export default BooksApp
