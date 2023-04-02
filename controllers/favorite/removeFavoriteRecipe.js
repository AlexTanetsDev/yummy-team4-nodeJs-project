const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const removeFavoriteRecipe = async (req, res) => {
  const { _id } = req.user;
  const { recipeId } = req.params;
  const isFavorite = await Recipe.findOne({ recipeId, favorites: _id });

  if (!isFavorite) {
    throw HttpError(409, "This recipe is not in favorites");
  }

  await Recipe.findOneAndUpdate(recipeId, { $pull: { favorites: _id } });

  res.status(201).json({ message: "Deleted from favorite" });
};

module.exports = removeFavoriteRecipe;
