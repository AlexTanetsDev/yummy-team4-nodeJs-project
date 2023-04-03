const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const removeFavoriteRecipe = async (req, res) => {
  const { _id: user } = req.user;
  const { recipeId } = req.params;
  const isFavorite = await Recipe.findOne({
    $and: [{ _id: recipeId }, { favorites: user }],
  });

  if (!isFavorite) {
    throw HttpError(409, "This recipe is not in favorites");
  }

  await Recipe.findByIdAndUpdate(recipeId, { $pull: { favorites: user } });

  res.status(201).json({ message: "Deleted from favorite" });
};

module.exports = removeFavoriteRecipe;
