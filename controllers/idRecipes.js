const {Recipe} = require("../models/recipe");


const getById = async (req, res) => {
    const { recipeId } = req.params;
    const result = await Recipe.getById(recipeId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  };

  module.exports = {
    getById,
  };