const { Recipe } = require("../models/recipe");
const { HttpError } = require("../helpers");

const getCategoriesRecepies = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const categoryRecipes = await Recipe.find({ category }, " ", {
    skip,
    limit: Number(limit),
  });
  if (!categoryRecipes) {
    throw HttpError(404, "Not found");
  }

  res.json(categoryRecipes);
};

module.exports = { getCategoriesRecepies };
