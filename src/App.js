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
    searching: false,
    results: []
  }

  componentDidMount () {
    this.getAllBooks()
  }

  getAllBooks () {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ books, updating: false })
      })
  }

  updateSearching () {
    this.setState({ searching: true })
  }

  updateBook (updateBook, shelf) {
    this.setState({ updating: true })

    updateBook.shelf = shelf

    BooksAPI.update (updateBook, shelf)
      .then(() => {
        this.getAllBooks()
      })
  }

  searchBooks (query) {
    if(query.length > 0) {
      BooksAPI.search(query, 20)
        .then((books) => {
          if(books.length > 0) {
            books = books.map((book) => {
              var findBook = this.state.books.filter((stateBook) => (stateBook.id === book.id))
              return (findBook.length > 0) ? findBook[0] : book
            })
          }

          this.setState({
            results: books,
            searching: false
          })
        })
    } else {
      this.setState({
        results: [],
        searching: false
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updating={this.state.updating}
            onUpdateBook={(book, shelf) => {
              this.updateBook(book, shelf)
            }}
          />
        )}/>
      <Route path="/search" render={() => (
        <SearchBooks
          books={this.state.results}
          updating={this.state.updating}
          searching={this.state.searching}
          onSearching={() => {
            this.updateSearching()
          }}
          onSearchBooks={(query) => {
            this.searchBooks(query)
          }}
          onUpdateBook={(book, shelf) => {
            this.updateBook(book, shelf)
          }}
          />
      )}/>
      </div>
    )
  }
}

export default BooksApp
