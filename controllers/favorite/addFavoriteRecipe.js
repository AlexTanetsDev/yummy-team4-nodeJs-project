const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const addFavoriteRecipe = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: recipeId } = req.params;
  const isFavorite = await Recipe.findOne({
    $and: [{ _id: recipeId }, { favorites: userId }],
  });

  let firstFavoriteRecipe = false;
  const data = await Recipe.find({ favorites: userId });

  if (data.length === 0) {
    firstFavoriteRecipe = true;
  }

  if (isFavorite) {
    throw HttpError(409, "This recipe has already added to favorite");
  }

  await Recipe.findByIdAndUpdate(recipeId, {
    $addToSet: { favorites: userId },
  });
  res.status(201).json({ message: "Added to favorite", firstFavoriteRecipe });
};

module.exports = addFavoriteRecipe;
