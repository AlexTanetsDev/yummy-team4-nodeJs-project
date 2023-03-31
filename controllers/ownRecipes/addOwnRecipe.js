const { Recipe } = require("../../models/recipe");

const addOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;

  const newRecipe = await Recipe.create({ ...req.body, owner: _id });

  res.status(201).json({
    data: newRecipe,
  });
};

module.exports = addOwnRecipes;
