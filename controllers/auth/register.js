const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { name, email, password } = req.body;
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
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `Hi ${name},<br>We just need to verify your email address before you can access So Yummy.<br><br>Verify your email address please <a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">link</a><br><br>Thanks! – The Team-Team team`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success",
  });
};

module.exports = register;
