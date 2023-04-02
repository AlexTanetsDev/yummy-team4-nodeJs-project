const { controllersWrapper } = require("../helpers");
const { Recipe } = require("../models/recipe");
const {Ingredient}= require("../models/ingredient")

const searchRecipesByTitle = async (req, res, next) => {
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const { title: title } = req.body;
  const searchParams = { $text: { $search: title } }

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
  
  const { ingredient: ingredient } = req.body;
  const searchParams = { $text: { $search: ingredient } }

  const searchedRecipes = await Ingredient.find(searchParams, "", {
    skip,
    limit,
  });

  res.status(200).json({
    data: searchedRecipes,
  });
};

module.exports = {
  searchRecipesByTitle: controllersWrapper(searchRecipesByTitle),
  searchRecipesByIngredient: controllersWrapper(searchRecipesByIngredient)
};