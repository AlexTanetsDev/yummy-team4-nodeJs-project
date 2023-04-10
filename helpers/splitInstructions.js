const splitInstructions = (recipes) => {
  const splited = recipes.map((recipe) => {
    recipe.instructions = recipe.instructions.split("\n");
    return recipe;
  });
  return splited;
};
module.exports = splitInstructions;
