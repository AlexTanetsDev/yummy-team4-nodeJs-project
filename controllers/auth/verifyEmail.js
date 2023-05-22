const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(
      401,
      "Your email has already been verified or email not found!"
    );
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(201).json({
    message: "Email verified",
  });
};

module.exports = verifyEmail;
