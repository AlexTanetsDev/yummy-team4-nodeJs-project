const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const removeOwnRecipe = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const recipeId = req.query.recipeId;

    const deletedRecipe = await Recipe.findById(
      { _id: recipeId },
      { author: userId }
    );

    console.log(deletedRecipe);

    if (!deletedRecipe) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({
      data: { message: "Recipe deleted" },
    });
  } catch (error) {
    throw HttpError(400, "Bad request");
  }
};

module.exports = removeOwnRecipe;
