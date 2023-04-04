const { Product } = require("../../models/product");
// const { HttpError } = require("../../helpers");

const addProduct = async (req, res) => {
  const { _id: user } = req.user;
  const result = await Product.create({ ...req.body, user });
  res.status(201).json(result);
};

module.exports = addProduct;
