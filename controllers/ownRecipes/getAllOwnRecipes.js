const { Recipe } = require("../../models/recipe");

const getAllOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const searchParams = { author: _id };

  const allOwnRecipes = await Recipe.find(
    searchParams,
    "-likes -tags -createdAt -updatedAt -favorites",
    {
      skip,
      limit,
    }
  );

  res.status(200).json(allOwnRecipes);
};

module.exports = getAllOwnRecipes;
