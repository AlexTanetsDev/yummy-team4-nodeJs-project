const { Recipe } = require("../../models/recipe");

const getRecepiesByCategory = async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const categoryRecipes = await Recipe.find(
    { category },
    "-updatedAt -createdAt",
    {
      skip,
      limit,
    }
  );

  res.json(categoryRecipes);
};

module.exports = getRecepiesByCategory;
