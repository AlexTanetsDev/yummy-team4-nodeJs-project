const { Product } = require("../../models/product");
const { HttpError } = require("../../helpers");

const getProductsList = async (req, res) => {
  const { _id: user } = req.user;
  try {
    const products = await Product.find({ user }, "-updatedAt -createdAt");
    res.json(products);
  } catch (err) {
    throw HttpError(500, err.toString());
  }
};

module.exports = getProductsList;
