const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { FRONT_BASE_URL } = process.env;

const { HttpError, sendEmail } = require("../../helpers");

const { SECRET_KEY } = process.env;

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }

  const payload = {
    _id: user._id,
    password: user.password,
  };

  const resetPasswordToken = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "5m",
  });

  const authentificationEmail = {
    to: email,
    subject: "Confirm password",
    html: `<a target="_blank" href="${FRONT_BASE_URL}/reset/${resetPasswordToken}">Click for authentificate email</a>`,
  };

  await sendEmail(authentificationEmail);

  res.json({
    message: "Authentification email send success",
  });
};

module.exports = forgotPassword;
