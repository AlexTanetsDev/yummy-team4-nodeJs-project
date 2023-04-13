const { Schema, model } = require("mongoose");

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

const Ingredient = model("ingredient", ingredientSchema);

module.exports = {
  Ingredient,
};
