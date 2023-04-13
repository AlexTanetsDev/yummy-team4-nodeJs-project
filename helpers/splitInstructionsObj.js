const splitInstructionsObj = (recipe) => {
  recipe.instructions = recipe.instructions.split("\n");
  return recipe;
};
module.exports = splitInstructionsObj;
