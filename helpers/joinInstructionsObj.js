const joinInstructionsObj = (recipe) => {
  recipe.instructions = recipe.instructions.join("\n");
  return recipe;
};
module.exports = joinInstructionsObj;
