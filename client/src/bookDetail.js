import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getSingleBookQuery } from "./query.js";

class BookDetail extends Component {
  displayDetail = () => {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <div>{book.name}</div>
          <div>{book.genre}</div>
          <div>{book.author.name}</div>
          <p>All books by author</p>
        </div>
      );
    }
  };
  render() {
    console.log(this.props.data);
    return (
      <div className="App">
        <ul>book detail</ul>
        <div>{this.displayDetail()}</div>
      </div>
    );
  }
}

export default graphql(getSingleBookQuery, {
  options: props => {
    return { variables: { id: props.bookId } };
  }
})(BookDetail);
