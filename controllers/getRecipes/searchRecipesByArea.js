const { Recipe } = require("../../models/recipe");

const searchRecipesByArea = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const { area } = req.params;
  const allAreaRecipes = await Recipe.find({ area }, "-createdAt -updatedAt");
  const data = (
    await Recipe.find({ area }, "-createdAt -updatedAt", {
      skip,
      limit,
    })
  ).map((recipe) => recipe.toObject());
  const total = allAreaRecipes.length;
  res.json({ data, total });
};

module.exports = searchRecipesByArea;
