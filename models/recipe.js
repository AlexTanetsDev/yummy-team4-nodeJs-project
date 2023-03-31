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
    },
    instructions: {
      type: String,
      //   default: "",
    },
    description: {
      type: String,
    },
    thumb: {
      type: String,
    },
    preview: {
      type: String,
    },
    time: {
      type: String,
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: {
      type: Date,
    },
    ingredients: [{ id: Schema.Types.ObjectId, measure : String}],
    author: {
      type: String,
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
  preview: Joi.string(),
  ingredients: Joi.string().required(),
});

const schemas = {
  recipe,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
