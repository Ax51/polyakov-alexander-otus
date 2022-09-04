const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const rootValue = require("./resolvers");
const app = express();
const PORT = 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue
  })
);

app.use("*", (_, res) => res.redirect("/graphql"));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
