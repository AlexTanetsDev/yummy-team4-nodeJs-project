const { Schema, model } = require("mongoose");
const Joi = require("joi");

const ingredientSchema = new Schema({
  ttl: {
    type: String,
  },
  desc: {
    type: String,
  },
  t: {
    type: String,
  },
  thb: {
    type: String,
  },
});

const getIngredientSchema = Joi.object({
  ingredient: Joi.string()
    .required()
    .messages({ "any.required": "missing field ingredient" }),
});

const schemas = {
  getIngredientSchema,
};

const Ingredient = model("ingredient", ingredientSchema);

module.exports = {
  Ingredient,
  schemas,
};
