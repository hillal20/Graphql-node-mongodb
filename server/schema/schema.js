const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const _ = require("lodash");

const BooKModel = require("../MDbooksModel.js");
const AuthorModel = require("../MDauthorsModel.js");

// let books = [
//   { name: "fil", genre: "x", id: "1", author_id: "1" },
//   { name: "bill", genre: "y", id: "2", author_id: "2" },
//   { name: "dill", genre: "z", id: "3", author_id: "3" },
//   { name: "zil", genre: "z", id: "4", author_id: "4" },
//   { name: "qqill", genre: "z", id: "5", author_id: "2" },
//   { name: "ttill", genre: "z", id: "6", author_id: "3" },
//   { name: "oooil", genre: "u", id: "7", author_id: "4" }
// ];

// let authors = [
//   { name: "donga", age: 40, id: "1" },
//   { name: "slala", age: 30, id: "2" },
//   { name: "balala", age: 39, id: "3" },
//   { name: "zlalal", age: 50, id: "4" }
// ];

const BookType = new GraphQLObjectType({
  name: "Book",

  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, { id: parent.author_id });
        return AuthorModel.findById(parent.author_id);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: "Author",

  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return _.filter(books, { author_id: parent.id });
        return BooKModel.find({ author_id: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    BOOK: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(books, { id: args.id });
        return BooKModel.findById(args.id);
      }
    },

    AUTHOR: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.find(authors, { id: args.id });
        return AuthorModel.findById(args.id);
      }
    },
    BOOKS: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return BooKModel.find({});
      }
    },
    AUTHORS: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return AuthorModel.find({});
      }
    }
  }
});

const Mutations = new GraphQLObjectType({
  name: "Mutation",

  fields: {
    ////////////////////////////
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let author = new AuthorModel({
          name: args.name,
          age: args.age
        });
        return author.save();
      }
    },
    ///////////////////////////////
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        author_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let book = new BookModel({
          name: args.name,
          genre: args.genre,
          author_id: args.author_id
        });
        return book.save();
      }
    }
    //////////////////////////////////
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
