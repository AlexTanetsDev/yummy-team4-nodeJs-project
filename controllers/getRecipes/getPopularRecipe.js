const { HttpError } = require("../../helpers");
const { Recipe } = require("../../models/recipe");

const getPopularRecipe = async (req, res) => {
  const result = await Recipe.find(
    {},
    "_id favorites title description preview"
  );

  if (!result.length) {
    throw HttpError(404, "Not found");
  }
  const popularRecipes = [];
  result.forEach((recipe) => {
    if (recipe.favorites.length > 0) {
      const rec = {
        id: recipe._id,
        popularity: recipe.favorites.length,
        title: recipe.title,
        description: recipe.description,
        preview: recipe.preview,
      };
      popularRecipes.push(rec);
    }
  });

  popularRecipes.sort((a, b) => b.popularity - a.popularity);
  const limitedRecipes = popularRecipes.slice(0, 4);
  res.json(limitedRecipes);
};

module.exports = getPopularRecipe;
