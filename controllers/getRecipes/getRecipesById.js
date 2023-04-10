const { Recipe } = require("../../models/recipe");
const { Ingredient } = require("../../models/ingredient");

const {
  HttpError,
  splitInstructionsObj,
  getIngredientsName,
} = require("../../helpers");

const getRecipesById = async (req, res) => {
  const { id } = req.params;

  const allIngredients = await Ingredient.find();

  const result = (
    await Recipe.findById(id, "-updatedAt -createdAt")
  ).toObject();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(getIngredientsName(splitInstructionsObj(result), allIngredients));
};

module.exports = getRecipesById;
