const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
// const { HttpError, sendEmail } = require("../../helpers");
const { HttpError } = require("../../helpers");

// const { BASE_URL } = process.env;
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  // const { name, email, password } = req.body;
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `Hi ${name},<br>We just need to verify your email address before you can access So Yummy.<br><br>Verify your email address please <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">link</a><br><br>Thanks! – The Team-Team team`,
  // };

  // await sendEmail(verifyEmail);

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  user = await User.findOne({ email });

  const payload = {
    _id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
      subscription: user.subscription,
    },
  });
};

module.exports = register;
