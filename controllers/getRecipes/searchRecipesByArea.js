const { Recipe } = require("../../models/recipe");

const searchRecipesByArea = async (req, res) => {
  // const { page = 1, limit = 4 } = req.query;
  // const skip = (page - 1) * limit;

  const { area } = req.params;

  const searchedRecipes = (
    await Recipe.find(
      { area },
      "-createdAt -updatedAt"
      // ,{
      // skip,
      // limit,
      // }
    )
  ).map((recipe) => recipe.toObject());
  res.json(searchedRecipes);
};

module.exports = searchRecipesByArea;
