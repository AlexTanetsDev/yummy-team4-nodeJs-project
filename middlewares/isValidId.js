const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { recipeId } = req.params;
  if (!isValidObjectId(recipeId)) {
    next(HttpError(400, `${recipeId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
