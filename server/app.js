const express = require("express");
const graphqlHTTP = require("express-graphql");
const server = express();
const Schema = require("./schema/schema.js");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://hilalaissani:password200@ds233500.mlab.com:33500/lambdanotesdb"
  )
  .then(p => {
    console.log("=== connected to lambdaNotesDB==");
  })
  .catch(err => {
    console.log(`err:${err}`);
  });

server.use(
  "/graphql",
  graphqlHTTP({
    schema: Schema,
    graphiql: true
  })
);
server.listen(4000, () => {
  console.log("===>server running on 4000");
});
