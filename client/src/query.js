import { gql } from "@apollo/client";

export const getAllUsers = gql`
query {
  getAllUsers{
    name, lastName, id 
  }
}
`

export const getBooksQuery = gql`
   {
    BOOKS {
      name
      id
    }
  }
`;
export const getAuthorQuery = gql`
  {
    AUTHORS {
      name
      id
    }
  }
`;

export const addBookQuery = gql`
  mutation ($name: String!, $genre: String!, $author_id: ID!) {
    addBook(name: $name, genre: $genre, author_id: $author_id) {
      name
      id
    }
  }
`;
export const getSingleBookQuery = gql`
  query ($id: ID) {
    BOOK(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
