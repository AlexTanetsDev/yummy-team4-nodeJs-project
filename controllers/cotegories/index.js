const { controllersWrapper } = require("../../helpers");
const getCategoryList = require("./categoryList");

module.exports = {
  getCategoryList: controllersWrapper(getCategoryList),
};
