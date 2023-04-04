const { controllersWrapper } = require("../../helpers");

const getProductList = require("./getProductList");
const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");

module.exports = {
  getProductList: controllersWrapper(getProductList),
  addProduct: controllersWrapper(addProduct),
  removeProduct: controllersWrapper(removeProduct),
};
