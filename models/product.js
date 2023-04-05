const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    quantity: {
      type: String,
      required: [true, "quantity is required"],
    },

    thumb: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const product = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "any.required": "missing field title" }),
  quantity: Joi.string()
    .required()
    .messages({ "any.required": "missing field quantity" }),
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
