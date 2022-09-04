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

module.exports = {
  items,
  customers
};
