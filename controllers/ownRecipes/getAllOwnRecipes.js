const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getAllOwnRecipes = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 4 } = req.query;
  const skip = (page - 1) * limit;

  const searchParams = { author: _id };

  const data = (
    await Recipe.find(
      searchParams,
      "-likes -tags -createdAt -updatedAt -favorites"
    )
  ).map((recipe) => recipe.toObject());

  res.json({
    data: splitInstructions(data.reverse().slice(skip, skip + limit)),
    total: data.length,
  });
};

module.exports = getAllOwnRecipes;
