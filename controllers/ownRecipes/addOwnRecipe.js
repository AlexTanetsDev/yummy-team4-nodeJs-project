const { Recipe } = require("../../models/recipe");

const addOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;
  const newAvatarUrl = req.file.path;

  console.log(newAvatarUrl, req.body);

  const newRecipe = await Recipe.create({
    ...req.body,
    thumb: newAvatarUrl,
    preview: newAvatarUrl,
    author: _id,
  });

  res.status(201).json({
    data: newRecipe,
  });
};

module.exports = addOwnRecipes;
