const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Item {
    id: ID
    name: String
    price: Int
    attributes: [Attr]
  }
  type Attr {
    id: ID
    title: String
    content: String
  }

  type Customer {
    id: ID
    username: String
    payments: [Payment]
  }
  type Payment {
    id: ID
    name: String
    cardNumber: Int
    cvc: Int
  }

  input CustomerInput {
    id: ID
    username: String!
    payments: [PaymentInput]
  }
  input PaymentInput {
    id: ID
    name: String!
    cardNumber: Int!
    cvc: Int
  }


  type Query {
    getItem(name: String): Item
    getAllItems: [Item]
    getAffordableItems(price: Int): [Item]
    getAllCustomers: [Customer]
    getCustomer(name: String): Customer
  }
  type Mutation {
    addCustomer(input: CustomerInput): Customer
  }
`);

module.exports = schema;
