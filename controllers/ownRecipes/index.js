const getAllOwnRecipes = require("./getAllOwnRecipes");
const addOwnRecipe = require("./addOwnRecipe");
const removeOwnRecipe = require("./removeOwnRecipe");
const { controllersWrapper } = require("../../helpers");

module.exports = {
  getAllOwnRecipes: controllersWrapper(getAllOwnRecipes),
  addOwnRecipe: controllersWrapper(addOwnRecipe),
  removeOwnRecipe: controllersWrapper(removeOwnRecipe),
};
