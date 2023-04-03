const { Recipe } = require("../../models/recipe");

const addOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;

  let recipeImageUrl =
    "https://res.cloudinary.com/dkkt8rmcn/image/upload/v1680464746/ndlcqobhy7tsrh5fgjoi.jpg";

  if (req.file) {
    recipeImageUrl = req.file.path;
  }

  const newRecipe = await Recipe.create({
    ...req.body,
    thumb: recipeImageUrl,
    preview: recipeImageUrl,
    author: _id,
  });

  res.status(201).json({
    data: newRecipe,
  });
};

module.exports = addOwnRecipe;
