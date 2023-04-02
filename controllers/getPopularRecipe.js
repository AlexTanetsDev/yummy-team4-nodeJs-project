const { controllersWrapper, HttpError } = require("../helpers");
const { Recipe } = require("../models/recipe");

const getPopularRecipe = async (req, res) => {
  const result = await Recipe.find({}, "_id favorites");

  if (!result) {
    throw HttpError(404, "Not found");
  }
  const popularResepies = [];
  result.forEach((recepie) => {
    if (recepie.favorites.length > 0) {
      const rec = {
        id: recepie._id,
        popularity: recepie.favorites.length,
      };
      popularResepies.push(rec);
    }
  });

  popularResepies.sort((a, b) => b.popularity - a.popularity);
  const limitedRecepies = popularResepies.slice(0, 4);
  res.json(limitedRecepies);
};

module.exports = {
  getPopularRecipe: controllersWrapper(getPopularRecipe),
};
