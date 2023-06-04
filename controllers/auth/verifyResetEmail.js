const { HttpError } = require("../../helpers");

const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const verifyResetEmail = async (req, res) => {
  const { resetPasswordToken } = req.params;
  const { _id, password } = jwt.verify(resetPasswordToken, SECRET_KEY);
  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(401, "User not found!");
  }

  if (password === !user.password) {
    throw HttpError(401, "Email authentification error!");
  }

  res.status(201).json({
    message: "Email is authentificated",
    user: {
      id: user._id,
      email: user.email,
    },
  });
};

module.exports = verifyResetEmail;
