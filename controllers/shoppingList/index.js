const { controllersWrapper } = require("../../helpers");

const getProductsList = require("./getProductsList");
const addProduct = require("./addProduct");
const removeProduct = require("./removeProduct");

module.exports = {
  getProductsList: controllersWrapper(getProductsList),
  addProduct: controllersWrapper(addProduct),
  removeProduct: controllersWrapper(removeProduct),
};
