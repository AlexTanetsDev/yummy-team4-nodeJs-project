const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getAllOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;
  let { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;
  limit = Number(limit) > 30 ? (limit = 30) : Number(limit);

  const searchParams = { author: _id };

  const dataCount = await Recipe.find(
    searchParams,
    "-likes -tags -createdAt -updatedAt -favorites"
  );

  const data = (
    await Recipe.find(
      searchParams,
      "-likes -tags -createdAt -updatedAt -favorites",
      {
        skip,
        limit,
      }
    )
  ).map((recipe) => recipe.toObject());

  res.json({
    data: splitInstructions(data),
    total: dataCount.length,
  });
};

module.exports = getAllOwnRecipes;
