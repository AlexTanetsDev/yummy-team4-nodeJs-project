const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },

    thumb: {
      type: String,
      required: true,
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
