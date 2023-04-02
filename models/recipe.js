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
      // required: [true, "Thumb is required"],
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
    favorites: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId],
    youtube: {
      type: String,
    },
    tags: [],
    ingredients: {
      type: [{ id: String, measure: String }],
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
  title: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  instructions: Joi.string().required(),
  time: Joi.string().required(),
  thumb: Joi.string(),
  preview: Joi.string(),
  ingredients: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      measure: Joi.string().required(),
    })
  ),
});

const schemas = {
  recipe,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
