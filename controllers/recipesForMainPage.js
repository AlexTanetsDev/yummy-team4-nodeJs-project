const { Recipe } = require("../models/recipe");

const { controllersWrapper, HttpError } = require("../helpers");

const getRecipesForMainPage = async (req, res) => {
    console.log(req)
 
  const { category } = req.query;
    const result = await Recipe.find({ category: category });
    
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
}

module.exports = {
  getRecipesForMainPage: controllersWrapper(getRecipesForMainPage),
};
