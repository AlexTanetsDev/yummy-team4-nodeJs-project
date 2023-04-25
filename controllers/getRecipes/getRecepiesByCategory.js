const { Recipe } = require("../../models/recipe");
const { splitInstructions } = require("../../helpers/");

const getRecepiesByCategory = async (req, res) => {
  const { category } = req.params;
  let { page = 1, limit = 8 } = req.query;
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const dataCount = await Recipe.find({ category }, "_id");

  const categoryRecipes = (
    await Recipe.find({ category }, "-updatedAt -createdAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());

  res.json({
    data: splitInstructions(categoryRecipes),
    total: dataCount.length,
  });
};

module.exports = getRecepiesByCategory;
