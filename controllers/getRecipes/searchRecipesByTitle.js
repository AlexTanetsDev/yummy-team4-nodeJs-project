const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const searchRecipesByTitle = async (req, res, next) => {
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const { title } = req.body;
  const searchParams = { $text: { $search: title } };

  const searchedRecipes = await Recipe.find(searchParams, "", {
    skip,
    limit,
  });
  if (!title) {
    throw HttpError(401, "Try looking for something else");
  }

  res.status(200).json({
    data: searchedRecipes,
  });
};

module.exports = searchRecipesByTitle;
