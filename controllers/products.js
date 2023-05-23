module.exports.getAllProducts = (req, res) => {
  res.send({
    productList: [
      { name: "Shoes", qty: 3, isOnSale: false },
      { name: "Pants", qty: 5, isOnSale: true },
      { name: "Joggers", qty: 73, isOnSale: false },
      { name: "iPhone", qty: 37, isOnSale: false },
    ],
  });
};
