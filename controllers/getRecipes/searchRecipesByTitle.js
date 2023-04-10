const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const searchRecipesByTitle = async (req, res) => {
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const { title } = req.params;
  const searchParams = { $text: { $search: title } };

  const searchedRecipes = (
    await Recipe.find(searchParams, "-createdAt -updatedAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());

  res.json(splitInstructions(searchedRecipes));
};

module.exports = searchRecipesByTitle;
