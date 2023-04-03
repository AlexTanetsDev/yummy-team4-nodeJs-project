const { controllersWrapper } = require("../../helpers");
const getAllFavoriteRecipes = require("./getAllFavoriteRecipes");
const addFavoriteRecipe = require("./addFavoriteRecipe");
const removeFavoriteRecipe = require("./removeFavoriteRecipe");

module.exports = {
  getAllFavoriteRecipes: controllersWrapper(getAllFavoriteRecipes),
  addFavoriteRecipe: controllersWrapper(addFavoriteRecipe),
  removeFavoriteRecipe: controllersWrapper(removeFavoriteRecipe),
};
