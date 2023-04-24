const { Ingredient } = require("../../models/ingredient");
const { Recipe } = require("../../models/recipe");
const { HttpError, splitInstructions } = require("../../helpers");

const searchRecipesByIngredient = async (req, res) => {
  let { page = 1, limit = 4 } = req.query;
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const { ingredient: ttl } = req.params;

  const searchParams = { $text: { $search: ttl } };
  const ingredientData = await Ingredient.findOne(searchParams);

  if (!ingredientData) {
    throw HttpError(400, "ingredient not found");
  }

  const { _id: id } = ingredientData;
  const result = (
    await Recipe.find({ "ingredients.id": id }, "-updatedAt -createdAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());

  res.json(splitInstructions(result));
};

module.exports = searchRecipesByIngredient;
