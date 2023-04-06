const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    instructions: {
      type: String,
      required: [true, "Instructions is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
      required: [true, "Cooking time is required"],
    },
    popularity: {
      type: Number,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "user" }],
    likes: [Schema.Types.ObjectId],
    youtube: {
      type: String,
    },
    tags: [String],
    ingredients: {
      type: [{ id: Schema.Types.ObjectId, measure: String }],
      required: [true, "Ingredients is required"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

recipeSchema.post("save", handleMongooseError);

const recipe = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "missing field title" }),
  category: Joi.string()
    .required()
    .messages({ "any.required": "missing field category" }),
  description: Joi.string()
    .required()
    .messages({ "any.required": "missing field description" }),
  instructions: Joi.string()
    .required()
    .messages({ "any.required": "missing field category" }),
  time: Joi.string()
    .required()
    .messages({ "any.required": "missing field time" }),
  thumb: Joi.string(),
  preview: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string()
        .required()
        .messages({ "any.required": "missing field ingredients id" }),
      measure: Joi.string()
        .required()
        .messages({ "any.required": "missing field ingredients measure" }),
    })
  ),
});

const title = Joi.object({
  title: Joi.string().required().messages({
    "string.base": `title should be a type of 'text'`,
    "string.empty": `title cannot be an empty field`,
    "any.required": `title is a required field`,
  }),
});

const ingredient = Joi.object({
  ingredient: Joi.string().required().messages({
    "string.base": `ingredient should be a type of 'text'`,
    "string.empty": `ingredient cannot be an empty field`,
    "any.required": `ingredient is a required field`,
  }),
});

const schemas = {
  recipe,
  title,
  ingredient,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
