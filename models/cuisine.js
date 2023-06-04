const { Schema, model } = require("mongoose");

const cuisineSchema = new Schema(
  {
    _id: {
      type: String,
      required: [true, "Id is required"],
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine is required"],
    },
    code: {
      type: String,
      required: [true, "Code is required"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Cuisine = model("cuisines", cuisineSchema);

module.exports = {
  Cuisine,
};
