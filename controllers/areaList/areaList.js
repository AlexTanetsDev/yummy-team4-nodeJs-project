const { Recipe } = require("../../models/recipe");

const getAreaList = async (req, res) => {
  const data = (await Recipe.find({}, "area -_id")).map((recipe) =>
    recipe.toObject()
  );

  const areas = [...new Set(Array.from(data, ({ area }) => area))]
    .sort((a, b) => a.localeCompare(b))
    .filter((el) => el !== undefined);

  res.json(areas);
};

module.exports = getAreaList;
