const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
  title: {
    type: String,
  },
  quantity: {
    type: String,
  },

  thumb: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const product = Joi.object({
  title: Joi.string().required(),
  quantity: Joi.string().required(),
  thumb: Joi.string(),
});

const schemas = {
  product,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};
