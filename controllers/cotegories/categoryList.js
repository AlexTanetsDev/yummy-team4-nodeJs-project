const fs = require("fs/promises");
const path = require("path");
const categoryListPath = path.join(
  __dirname,
  "..",
  "..",
  "StaticData",
  "categoryList.json"
);

const getCategoryList = async (req, res) => {
  const result = await fs.readFile(categoryListPath);
  const data = JSON.parse(result);
  res.json(data);
};

module.exports = getCategoryList;
