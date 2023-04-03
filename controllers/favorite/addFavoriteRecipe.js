const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const addFavoriteRecipe = async (req, res) => {
  const { _id } = req.user;
  const { recipeId } = req.params;
  const isFavorite = await Recipe.findOne({ _id, recipeId });

  if (isFavorite) {
    throw HttpError(409, "This recipe has already added to favorite");
  }

  await Recipe.findOneAndUpdate(recipeId, { $addToSet: { favorites: _id } });

  res.status(201).json({ message: "Added to favorite" });
};

module.exports = addFavoriteRecipe;
