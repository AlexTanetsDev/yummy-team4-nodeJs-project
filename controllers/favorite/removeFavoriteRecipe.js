const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const removeFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: recipeId } = req.params;
  const isFavorite = await Recipe.findOne({
    $and: [{ _id: recipeId }, { favorites: userId }],
  });

  if (!isFavorite) {
    throw HttpError(404, "This recipe is not in favorites");
  }

  await Recipe.findByIdAndUpdate(recipeId, { $pull: { favorites: userId } });

  res.json({ message: "Deleted from favorite" });
};

module.exports = removeFavoriteRecipe;
