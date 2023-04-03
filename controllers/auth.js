const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
// const path = require("path");
// const jimp = require("jimp");
// const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { User } = require("../models/user");
const cloudinary = require("cloudinary").v2;

const { SECRET_KEY, BASE_URL } = process.env;

const { controllersWrapper, HttpError, sendEmail } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  const mail = {
    to: email,
    subject: "subscribe to news ",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${token}">Click to subscribe "So Yummy"</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  // if (!user.verify) {
  //   throw HttpError(401, "Email not verified");
  // }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      // subscription: user.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id, name } = req.body;
  const { filename } = req.file;

  const newAvatarUrl = cloudinary.url(filename, {
    gravity: "faces",
    width: 250,
    height: 250,
    crop: "fill",
  });

  await User.findByIdAndUpdate(_id, { avatarURL: newAvatarUrl, name });
  res.json({
    name,
    newAvatarUrl,
  });
};

const getCurrent = async (req, res) => {
  const { email } = req.user;
  res.json({
    email,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

/* Subscription */
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );

  res.json({
    data: updatedUser,
  });
};

module.exports = {
  register: controllersWrapper(register),
  login: controllersWrapper(login),
  updateAvatar: controllersWrapper(updateAvatar),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
  updateSubscription: controllersWrapper(updateSubscription),
};
