const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
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

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      avatarURL: user.avatarURL,
    },
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

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
  verifyEmail: controllersWrapper(verifyEmail),
  resendVerifyEmail: controllersWrapper(resendVerifyEmail),
  login: controllersWrapper(login),
  updateAvatar: controllersWrapper(updateAvatar),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
  updateSubscription: controllersWrapper(updateSubscription),
};
