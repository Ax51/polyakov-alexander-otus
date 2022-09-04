const { items, customers } = require("../fakeDb/Db");

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

module.exports = {
  ...itemsStore,
  ...customersStore
};
