const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

BookModel = mongoose.model("Book", BookSchema);
module.exports = BookModel;
