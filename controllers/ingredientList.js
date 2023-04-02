const { Ingredient } = require("../models/ingredient");

const { controllersWrapper, HttpError } = require("../helpers");

const getAllIngredients = async (req, res) => {
  console.log("функція працює");
  const result = await Ingredient.find();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAllIngredients: controllersWrapper(getAllIngredients),
};
