const { Product } = require("../../models/product");

const addProduct = async (req, res) => {
  const { _id } = req.user;

  const arrayProducts = req.body.products.map((product) => {
    product.user = _id;
    return product;
  });

  await Product.create(arrayProducts);

  res.status(201).json({ message: "Products added" });
};

module.exports = addProduct;
