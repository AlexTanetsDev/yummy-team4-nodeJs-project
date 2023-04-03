const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const getAllFavoriteRecipes = async (req, res) => {
  const { _id } = req.user;
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const data = await Recipe.find(
    { favorites: _id },
    {
      skip,
      limit,
    }
  );

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
};

module.exports = getAllFavoriteRecipes;
