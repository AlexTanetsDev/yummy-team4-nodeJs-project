const category = require("../models/category/index");

const getCategoryList = async (req, res) => {
  const result = await category.getCategoryList();
  res.json(result);
};

module.exports = {
  getCategoryList,
};
