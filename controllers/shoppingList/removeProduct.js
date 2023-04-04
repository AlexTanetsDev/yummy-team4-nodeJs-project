const { Product } = require("../../models/product");
const { HttpError } = require("../../helpers");

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

module.exports = removeProduct;
