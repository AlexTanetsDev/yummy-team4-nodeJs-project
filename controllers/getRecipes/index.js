const { controllersWrapper } = require("../../helpers");
const getRecepiesByCategory = require("./getRecepiesByCategory");
const getMainPageRecipes = require("./mainPageRecipes");
const getRecipesById = require("./getRecipesById");
const getPopularRecipe = require("./getPopularRecipe");
const searchRecipesByTitle = require("./searchRecipesByTitle");
const searchRecipesByIngredient = require("./searchRecipesByIngredient");
const searchRecipesByArea = require("./searchRecipesByArea");

module.exports = {
  getRecepiesByCategory: controllersWrapper(getRecepiesByCategory),
  getMainPageRecipes: controllersWrapper(getMainPageRecipes),
  getRecipesById: controllersWrapper(getRecipesById),
  getPopularRecipe: controllersWrapper(getPopularRecipe),
  searchRecipesByTitle: controllersWrapper(searchRecipesByTitle),
  searchRecipesByIngredient: controllersWrapper(searchRecipesByIngredient),
  searchRecipesByArea: controllersWrapper(searchRecipesByArea),
};
