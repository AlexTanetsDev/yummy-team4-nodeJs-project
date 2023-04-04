const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const getRecipesById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getRecipesById;
