const { Recipe } = require("../models/recipe");
const { HttpError, controllersWrapper } = require("../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getById: controllersWrapper(getById),
};
