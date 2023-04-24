const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getAllOwnRecipes = async (req, res) => {
  const { _id } = req.user;
  let { page = 1, limit = 4 } = req.query;
  page = Number(page);
  limit = Number(limit);
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
