const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const subscriptionList = ["subscribe", "unsubscribe"];

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailPattern,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
      default: null,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "unsubscribe",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "any.required": `Password is a required field`,
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of 6`,
    "any.required": `Password is a required field`,
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.pattern.base": `Email  fails to match the required pattern example@mial.com`,
    "any.required": `Email is a required field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.pattern.base": `Email  fails to match the required pattern example@mial.com`,
    "any.required": `Email is a required field`,
  }),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.base": `Password should be a type of 'text'`,
    "string.empty": `Password cannot be an empty field`,
    "string.min": `Password should have a minimum length of 6`,
    "any.required": `Password is a required field`,
  }),
  email: Joi.string().pattern(emailPattern).required().messages({
    "string.base": `Email should be a type of 'text'`,
    "string.empty": `Email cannot be an empty field`,
    "string.pattern.base": `Email  fails to match the required pattern example@mial.com`,
    "any.required": `Email is a required field`,
  }),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .required()
    .valid(...subscriptionList)
    .messages({
      "string.base": `Subscription should be a type of 'text'`,
      "string.empty": `Subscription cannot be an empty field`,
      "any.required": `Subscription is a required field`,
    }),
});

const schemas = {
	registerSchema,
	emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
