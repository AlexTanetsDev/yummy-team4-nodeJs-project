const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const removeOwnRecipe = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const recipeId = req.params.id;

    const deletedRecipe = await Recipe.findByIdAndDelete(
      { _id: recipeId },
      { author: userId }
    );

    if (!deletedRecipe) {
      throw HttpError(404, "Recipe not found");
    }

    res.json({
      message: "Recipe deleted",
    });
  } catch (error) {
    throw HttpError(400, "Bad request");
  }
};

module.exports = removeOwnRecipe;
