const { Recipe } = require("../../models/recipe");

const {
  HttpError,
  controllersWrapper,
  splitInstructions,
} = require("../../helpers");

const ingredientRecipes = async (req, res) => {
  let { ingredientId = null, page = 1, limit = 8 } = req.query;
  page = Number(page);
  limit = Number(limit);
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
