const { Product } = require("../models/product");
const { HttpError, controllersWrapper } = require("../helpers");

const getProductList = async (req, res) => {
  const { _id: user } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find({ user }, "", { skip, limit });
    res.json(products);
  } catch (err) {
    throw HttpError(500, err.toString());
  }
};

const addProduct = async (req, res) => {
  const { _id: user } = req.user;
  const result = await Product.create({ ...req.body, user });
  res.status(201).json(result);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getProductList: controllersWrapper(getProductList),
  addProduct: controllersWrapper(addProduct),
  removeProduct: controllersWrapper(removeProduct),
};
