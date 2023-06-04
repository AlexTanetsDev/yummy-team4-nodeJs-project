const { Recipe } = require("../../models/recipe");
const { HttpError } = require("../../helpers");

const getMainPageRecipes = async (req, res) => {
  const data = (await Recipe.find({}, "category -_id")).map((recipe) =>
    recipe.toObject()
  );

  const categories = [...new Set(Array.from(data, ({ category }) => category))]
    .sort((a, b) => a.localeCompare(b))
    .filter((el) => el !== undefined);

  const recipesList = await Recipe.find(
    { category: categories },
    "_id title category preview author favorites"
  );

  if (!recipesList) {
    throw HttpError(404, "Not found");
  }

  const result = categories.map((item) => {
    return {
      category: item,
      recipes: [...recipesList]
        .sort((a, b) => b.favorites.length - a.favorites.length)
        .filter((dish) => dish.category === item)
        .slice(0, 4),
    };
  });

  res.json(result);
};

module.exports = getMainPageRecipes;
