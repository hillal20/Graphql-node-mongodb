import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { getAuthorQuery, addBookQuery, getBooksQuery } from "./query.js";

const AddBook = (props) => {
  const {
    error: getAuthorError,
    loading: getAuthorLoading,
    data: getAuthorData,
  } = useQuery(getAuthorQuery);

  const [state, setState] = useState({
    bookName: "",
    bookGenre: "",
    authorId: "",
  });

  const [addBook, { error: addBookError }] = useMutation(addBookQuery);

  useEffect(() => {
    console.log("data ==> ", getAuthorData);
  }, [getAuthorData]);

  const displayAuthors = () => {
    if (getAuthorLoading) {
      return <option>loading books</option>;
    } else {
      return getAuthorData.AUTHORS.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const eventHandler = (event) => {
    const { name, value } = event.target;

    setState((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const submit = () => {
    addBook({
      variables: {
        name: state.bookName,
        genre: state.bookGenre,
        // author_id: state.authorId,
        author_id: 3,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    if (addBookError) {
      console.log("addBookError ==>", addBookError);
    }
  };

  return (
    <div>
      add book
      <input
        type="text"
        name="bookName"
        value={state.bookName}
        onChange={eventHandler}
      />
      book genre
      <input
        type="text"
        value={state.bookGenre}
        name="bookGenre"
        onChange={eventHandler}
      />
      <select
        onChange={(event) => {
          setState((pre) => ({ ...pre, authorId: event.target.value }));
        }}
      >
        <option>select author</option>
        {displayAuthors()}
      </select>
      <button onClick={submit}>submit</button>
    </div>
  );
};
export default AddBook;
