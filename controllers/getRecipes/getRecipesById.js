const { Recipe } = require("../../models/recipe");
const { HttpError, splitInstructionsObj } = require("../../helpers");

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const result = (
    await Recipe.findById(id, "-updatedAt -createdAt")
  ).toObject();

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(splitInstructionsObj(result));
};

module.exports = getRecipesById;
