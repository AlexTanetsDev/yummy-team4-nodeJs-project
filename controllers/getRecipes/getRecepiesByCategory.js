const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getRecepiesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const categoryRecipes = (
    await Recipe.find({ category }, "-updatedAt -createdAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());

  res.json(splitInstructions(categoryRecipes));
};

module.exports = getRecepiesByCategory;
