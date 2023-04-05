const { Product } = require("../../models/product");
const { HttpError } = require("../../helpers");

const getProductsList = async (req, res) => {
  const { _id: user } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find({ user }, "-updatedAt -createdAt", {
      skip,
      limit,
    });
    res.json(products);
  } catch (err) {
    throw HttpError(500, err.toString());
  }
};

module.exports = getProductsList;
