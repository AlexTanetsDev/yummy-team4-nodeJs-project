const { Recipe } = require("../models/recipe");

const { controllersWrapper, HttpError } = require("../helpers");

const getMainPageRecipes = async (req, res) => {
  
    // const { category } = req.query;
  
    const category = ["Miscellaneous", "Breakfast", "Vegan", "Dessert"]

    // const { page = 1, limit = 10 } = req.query;
    // const skip = (page - 1) * limit;

    // const result = await Recipe.find({ category: category }, "-createdAT -updateAt", {skip, limit});
    
  const result = await Recipe.find({ category: category } ) ;
  
  
    if (!result) {
      throw HttpError(404, 'Not found');
    }
  
  result.sort((a, b) => a.category.localeCompare(b.category));
  
    res.json(result);
}

module.exports = {
  getMainPageRecipes: controllersWrapper(getMainPageRecipes),
};
