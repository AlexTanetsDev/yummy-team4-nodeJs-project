const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const ingredientSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "Id is required"],
    },
    ttl: {
      type: String,
      required: [true, "Title is required"],
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

ingredientSchema.post("save", handleMongooseError);

const ingredient = Joi.object({
  _id: Joi.string().required(),
  ttl: Joi.string().required(),
  //   desc: Joi.string().required(),
  //   t: Joi.string(),
  //   thb: Joi.string().required(),
});

const schemas = {
  ingredient,
};

const Ingredient = model("ingredient", ingredientSchema);

module.exports = { Ingredient, schemas };
