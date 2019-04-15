import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "./query.js";
import BookDetail from "./bookDetail.js";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }
  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return <div>loading books</div>;
    } else {
      return data.BOOKS.map(book => {
        return (
          <li
            key={book.id}
            onClick={event => {
              this.setState({ id: book.id });
              alert("hello");
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  }

  render() {
    return (
      <div className="App">
        <ul> {this.displayBooks()}</ul>
        <BookDetail bookId={this.state.id} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
