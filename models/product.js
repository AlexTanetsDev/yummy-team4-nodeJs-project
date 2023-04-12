const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "missing field title"],
    },
    quantity: {
      type: String,
      required: [true, "missing field quantity"],
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
          .messages({ "any.required": "products title is a required field" }),
        quantity: Joi.string().required().messages({
          "any.required": "products quantity is a required field",
        }),
        thumb: Joi.string(),
      })
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
