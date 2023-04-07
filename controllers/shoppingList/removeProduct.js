const { Product } = require("../../models/product");
const { HttpError } = require("../../helpers");

const removeProduct = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: productId } = req.params;

  const result = await Product.findByIdAndRemove(
    { _id: productId },
    { user: userId }
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeProduct;
