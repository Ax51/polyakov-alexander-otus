const items = [
  {
    id: 1,
    name: "Refrigerator",
    price: 399
  },
  {
    id: 2,
    name: "Microwave",
    price: 199
  }
];

const customers = [
  {
    id: 1,
    username: "Vasya",
    payments: [{ name: "Visa", cardNumer: 12345 }]
  }
];

const itemsStore = {
  getAllItems: () => items,
  getItem: ({ name }) => items.find(item => item.name === name),
  getAffordableItems: ({ price }) => items.filter(item => item.price <= price)
};

const customersStore = {
  getAllCustomers: () => customers,
  getCustomer: ({ name }) => customers.find(customer => customer.name === name),
  addCustomer: ({ input }) => {
    const customer = {
      id: Date.now(),
      ...input
    };
    customers.push(customer);
    return customer;
  }
};

const rootValue = {
  ...itemsStore,
  ...customersStore
};

module.exports = rootValue;
