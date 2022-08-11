import React from "react";
import BookList from "./booklist.js";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AddBook from "./addBook.js";

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.map((message, location, path) => {
//       alert("gq error ==> ", message);
//     });
//   }
// });
// const link = from([errorLink, new HttpLink("http://localhost:4000/graphql")]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql",
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Welcome to React</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
};

export default App;
