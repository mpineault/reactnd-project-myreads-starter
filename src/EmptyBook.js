import React, { Component } from 'react'

class EmptyBook extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193 }}>
            <div className="book-cover-title">No Results</div>
          </div>
        </div>
      </div>
    )
  }
}

export default EmptyBook
