const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const resetPassword = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "User not found!");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
  });

  res.status(201).json({
    message: "Password successfully changed",
    user: {
      email: email,
      password: hashPassword,
    },
  });
};

module.exports = resetPassword;
