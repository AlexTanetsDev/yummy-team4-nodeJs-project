const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const { HttpError, controllersWrapper } = require("../../helpers");

const ingredientRecipes = async (req, res) => {
  const { ingredientId = null, page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  if (!ingredientId) {
    throw HttpError(400, "ingredient id not set");
  }

  const result = (
    await Recipe.find(
      { "ingredients.id": ingredientId },
      "-updatedAt -createdAt",
      {
        skip,
        limit,
      }
    )
  ).map((recipe) => recipe.toObject());

  res.json(splitInstructions(result));
};

module.exports = {
  ingredientRecipes: controllersWrapper(ingredientRecipes),
};
