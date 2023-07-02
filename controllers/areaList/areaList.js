const { Recipe } = require("../../models/recipe");
const { Cuisine } = require("../../models/cuisine");

const getAreaList = async (req, res) => {
  const data = (await Recipe.find({}, "area -_id")).map((recipe) =>
    recipe.toObject()
  );

  const areas = [...new Set(Array.from(data, ({ area }) => area))]
    .sort((a, b) => a.localeCompare(b))
    .filter((el) => el !== undefined && el !== "Russian");

  const cuisineCodes = (await Cuisine.find({}, "-_id")).map((cuisine) =>
    cuisine.toObject()
  );

  const areasWithCode = [];
  areas.forEach((area) => {
    const item = cuisineCodes.find((cus) => cus.cuisine === area.toLowerCase());
    if (item) areasWithCode.push(item);
  });
  res.json(areasWithCode);
};

module.exports = getAreaList;
