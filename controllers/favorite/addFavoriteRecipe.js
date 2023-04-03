const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const addFavoriteRecipe = async (req, res) => {
  const { _id: user } = req.user;
  const { recipeId } = req.params;
  const isFavorite = await Recipe.findOne({
    $and: [{ _id: recipeId }, { favorites: user }],
  });

  if (isFavorite) {
    throw HttpError(409, "This recipe has already added to favorite");
  }

  await Recipe.findByIdAndUpdate(recipeId, { $addToSet: { favorites: user } });
  res.status(201).json({ message: "Added to favorite" });
};

module.exports = addFavoriteRecipe;
