const { Recipe } = require("../../models/recipe");
// const { splitInstructions } = require("../../helpers/");

const getAllFavoriteRecipes = async (req, res) => {
  const { _id: user } = req.user;
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;

  const data = (
    await Recipe.find({ favorites: user }, "-createdAt").sort({
      updatedAt: -1,
    })
  ).map((recipe) => recipe.toObject());

  res.json({
    data: data.slice(skip, skip + limit),
    total: data.length,
  });
};

module.exports = getAllFavoriteRecipes;
