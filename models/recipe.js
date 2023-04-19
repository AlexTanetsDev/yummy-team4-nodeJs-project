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
    area: {
      type: String,
      required: [true, "Area is required"],
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
    .messages({ "any.required": "title is a required field" }),
  category: Joi.string()
    .required()
    .messages({ "any.required": "category is a required field" }),
  area: Joi.string(),
  description: Joi.string()
    .required()
    .messages({ "any.required": "description is a required field" }),
  instructions: Joi.array()
    .required()
    .items(Joi.string())
    .messages({ "any.required": "instructions is a required field" }),
  time: Joi.string()
    .required()
    .messages({ "any.required": "time is a required field" }),
  thumb: Joi.string(),
  preview: Joi.string(),
  ingredients: Joi.array()
    .required()
    .items(
      Joi.object({
        id: Joi.string()
          .required()
          .messages({ "any.required": "mingredients id is a required field" }),
        measure: Joi.string().required().messages({
          "any.required": "ingredients measure is a required field",
        }),
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
