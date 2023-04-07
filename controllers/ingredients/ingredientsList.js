const { Ingredient } = require("../../models/ingredient");

const { controllersWrapper } = require("../../helpers");

const getAllIngredients = async (req, res) => {
  const result = await Ingredient.find();

  res.json(result);
};

module.exports = {
  getAllIngredients: controllersWrapper(getAllIngredients),
};
