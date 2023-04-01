const category = require("../models/category");

const getCategoryList = async (req, res) => {
  const result = await category.getCategoryList();
  res.json(result);
};

module.exports = {
  getCategoryList,
};
