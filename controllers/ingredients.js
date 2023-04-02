const { Recipe } = require("../models/recipe");

const { HttpError, controllersWrapper } = require("../helpers");

const ingredientRecipes = async (req, res) => {
  const { ingredientId = null, page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  if (!ingredientId) {
    throw HttpError(400, "ingredient id not set");
  }


  const { _id: id } = ingredientData;


  const result = await Recipe.find(
    { "ingredients.id": ingredientId },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  );

  if (!result.length) {
    throw HttpError(400, "ingredient in recipes not found");
  }
  res.json(result);
};

module.exports = {
  ingredientRecipes: controllersWrapper(ingredientRecipes),
};
