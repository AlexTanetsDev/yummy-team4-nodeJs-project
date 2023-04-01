const fs = require("fs/promises");
const path = require("path");
const categoryListPath = path.join(__dirname, "categoryList.json");

const getCategoryList = async () => {
  const data = await fs.readFile(categoryListPath);
  return JSON.parse(data);
};
module.exports = {
  getCategoryList,
};
