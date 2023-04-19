const { Recipe } = require("../../models/recipe");

const getCategoryList = async (req, res) => {
  const data = (await Recipe.find({}, "category -_id")).map((recipe) =>
    recipe.toObject()
  );

  const categories = [...new Set(Array.from(data, ({ category }) => category))]
    .sort((a, b) => a.localeCompare(b))
    .filter((el) => el !== undefined);

  res.json(categories);
};

module.exports = getCategoryList;

// const fs = require("fs/promises");
// const path = require("path");
// const categoryListPath = path.join(
//   __dirname,
//   "..",
//   "..",
//   "StaticData",
//   "categoryList.json"
// );

// const getCategoryList = async (req, res) => {
//   const result = await fs.readFile(categoryListPath);
//   const data = JSON.parse(result);
//   res.json(data);
// };

// module.exports = getCategoryList;
