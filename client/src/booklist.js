import React, { Component, useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery, getAllUsers } from "./query.js";
import BookDetail from "./bookDetail.js";

const BookList = (props) => {
  const {
    error: error1,
    loading: loading1,
    data: data1,
  } = useQuery(getAllUsers);
  const {
    error: error2,
    loading: loading2,
    data: data2,
  } = useQuery(getBooksQuery);
  const [state, setState] = useState({
    id: "",
  });
  console.log("error ===> ", error1);
  console.log("data1 ===> ", data1);
  console.log("error ===> ", error2);
  console.log("data1 ===> ", data2);
  const displayBooks = () => {
    if (loading2) {
      return <div>loading books</div>;
    } else {
      return data2.BOOKS.map((book) => {
        return (
          <li
            key={book.id}
            onClick={(event) => {
              setState((pre) => ({ ...pre, id: book.id }));
              alert("hello");
            }}
          >
            {book.name}
          </li>
        );
      });
    }
  };

  return (
    <div className="App">
      <div>books</div>
      <ul> {displayBooks()}</ul>
      {/* <BookDetail bookId={state.id} /> */}
    </div>
  );
};

export default BookList;
