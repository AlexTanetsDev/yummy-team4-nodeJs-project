const { Ingredient } = require("../models/ingredient");
const { Recipe } = require("../models/recipe");

const { HttpError, controllersWrapper } = require("../helpers");

const ingredientRecipes = async (req, res) => {
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  const { ingredient: ttl } = req.body;

  const ingredientData = await Ingredient.findOne({ ttl });
  if (!ingredientData) {
    throw HttpError(400, "ingredient not found");
  }

  const { _id: id } = ingredientData;
  console.log(id);
  const result = await Recipe.find(
    { "ingredients.id": id },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  );

  console.log(result);
  if (!result.length) {
    throw HttpError(400, "ingredient in recipes not found");
  }
  res.json(result);
};

module.exports = {
  ingredientRecipes: controllersWrapper(ingredientRecipes),
};
