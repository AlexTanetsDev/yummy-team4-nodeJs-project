const getIngredientsName = (recipe, allIngredients) => {
  const ingredientsWithNames = recipe.ingredients.map((ingredient) => {
    const element = allIngredients.find(
      (el) => el._id === String(ingredient.id)
    );
    if (element) {
      ingredient.name = element.ttl;
      ingredient.image = element.thb;
    }
    return ingredient;
  });

  recipe.ingredients = ingredientsWithNames;
  return recipe;
};
module.exports = getIngredientsName;
