const { Recipe } = require("../models/recipe");

const { controllersWrapper, HttpError } = require("../helpers");

const getMainPageRecipes = async (req, res) => {

    const { category } = req.query;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;

    const result = await Recipe.find({ category: category }, "-createdAT -updateAt", {skip, limit});
    
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

module.exports = {
  getMainPageRecipes: controllersWrapper(getMainPageRecipes),
};
