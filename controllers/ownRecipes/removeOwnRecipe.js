const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const removeOwnRecipes = async (req, res, next) => {
  const deletedRecipe = await Recipe.findByIdAndRemove({
    _id: req.body.recipeId,
  });

  if (!deletedRecipe) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    data: { message: "Recipe deleted" },
  });
};

module.exports = removeOwnRecipes;
