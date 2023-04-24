const { Ingredient } = require("../../models/ingredient");

const { controllersWrapper } = require("../../helpers");

const getAllIngredients = async (req, res) => {
  const result = await Ingredient.find();

  res.json(result.sort((a, b) => a.ttl.localeCompare(b.ttl)));
};

module.exports = {
  getAllIngredients: controllersWrapper(getAllIngredients),
};
