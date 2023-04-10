const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getAllFavoriteRecipes = async (req, res) => {
  const { _id: user } = req.user;
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const data = (
    await Recipe.find({ favorites: user }, "-createdAt -updatedAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());

  res.json(splitInstructions(data));
};

module.exports = getAllFavoriteRecipes;
