const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  age: Number
});

AuthorModel = mongoose.model("Author", AuthorSchema);
module.exports = AuthorModel;
