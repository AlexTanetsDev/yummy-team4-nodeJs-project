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
  products: Joi.array()
    .required()
    .items(
      Joi.object({
        title: Joi.string()
          .required()
          .messages({ "any.required": "products is required" }),
        quantity: Joi.string()
          .required()
          .messages({ "any.required": "products is required" }),
        thumb: Joi.string()
          .required()
          .messages({ "any.required": "products is required" }),
      })
        .required()
        .messages({ "any.required": "products is required" })
    ),
});

const schemas = {
  product,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};
