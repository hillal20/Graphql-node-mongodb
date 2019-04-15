import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorQuery, addBookQuery, getBooksQuery } from "./query.js";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookName: "",
      bookGenre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    let data = this.props.getAuthorQuery;
    if (data.loading) {
      return <option>loading books</option>;
    } else {
      return data.AUTHORS.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  eventHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = () => {
    this.props.addBookQueryMutation({
      variables: {
        name: this.state.bookName,
        genre: this.state.bookGenre,
        author_id: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        add book
        <input
          type="text"
          name="bookName"
          value={this.state.bookName}
          onChange={this.eventHandler}
        />
        <input
          type="text"
          value={this.state.bookGenre}
          name="bookGenre"
          onChange={this.eventHandler}
        />
        <select
          onChange={event => {
            this.setState({ authorId: event.target.value });
          }}
        >
          <option>select author</option>
          {this.displayAuthors()}
        </select>
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}
export default compose(
  graphql(getAuthorQuery, { name: "getAuthorQuery" }),
  graphql(addBookQuery, { name: "addBookQueryMutation" })
)(AddBook);
