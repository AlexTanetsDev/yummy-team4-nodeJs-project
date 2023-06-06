const { Recipe } = require("../../models/recipe");
const { joinInstructionsObj } = require("../../helpers/");

const addOwnRecipe = async (req, res, next) => {
  const { _id } = req.user;

  let recipeImageUrl =
    "https://res.cloudinary.com/dkkt8rmcn/image/upload/v1680464746/ndlcqobhy7tsrh5fgjoi.jpg";

  if (req.file) {
    recipeImageUrl = req.file.path;
  }
  const instructions = joinInstructionsObj(req.body.instructions);
  const time = String(Number.parseInt(req.body.time));
  let firstAddedRecipe = false;
  let tenthAddedRecipe = false;

  const data = await Recipe.find({ author: _id });

  if (data.length === 0) {
    firstAddedRecipe = true;
  }

  if (data.length === 9) {
    tenthAddedRecipe = true;
  }

  console.log(tenthAddedRecipe, firstAddedRecipe);
  const newRecipe = await Recipe.create({
    ...req.body,
    time,
    area: "Owner",
    instructions,
    thumb: recipeImageUrl,
    preview: recipeImageUrl,
    author: _id,
  });

  res.status(201).json({ newRecipe, firstAddedRecipe, tenthAddedRecipe });
};

module.exports = addOwnRecipe;
