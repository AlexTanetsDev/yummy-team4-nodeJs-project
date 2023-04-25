const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const fs = require("fs/promises");
const path = require("path");
const categoryListPath = path.join(
  __dirname,
  "..",
  "..",
  "StaticData",
  "categoryList.json"
);

const getMainPageRecipes = async (req, res) => {
  const categoryList = await fs.readFile(categoryListPath, "utf-8");
  const category = JSON.parse(categoryList);

  const recipesList = await Recipe.find(
    { category: category },
    "_id title category preview author favorites"
  );

  if (!recipesList) {
    throw HttpError(404, "Not found");
  }

  const result = category.map((item) => {
    return {
      category: item,
      recipes: [...recipesList]
        .sort((a, b) => b.favorites.length - a.favorites.length)
        .filter((dish) => dish.category === item)
        .slice(0, 4),
    };
  });

  res.json(result);
};

module.exports = getMainPageRecipes;
