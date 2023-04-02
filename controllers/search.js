const { controllersWrapper, HttpError } = require("../helpers");
const { Recipe } = require("../models/recipe");
const { Ingredient } = require("../models/ingredient");

const searchRecipesByTitle = async (req, res, next) => {
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const { title } = req.body;
  const searchParams = { $text: { $search: title } };

  const searchedRecipes = await Recipe.find(searchParams, "", {
    skip,
    limit,
  });
  if (!title) {
    throw HttpError(401, "Try looking for something else");
  }

  res.status(200).json({
    data: searchedRecipes,
  });
};

const searchRecipesByIngredient = async (req, res, next) => {
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const { ingredient: ttl } = req.body;

  const searchParams = { $text: { $search: ttl } };
  const ingredientData = await Ingredient.findOne(searchParams, "");
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
  searchRecipesByTitle: controllersWrapper(searchRecipesByTitle),
  searchRecipesByIngredient: controllersWrapper(searchRecipesByIngredient),
};
