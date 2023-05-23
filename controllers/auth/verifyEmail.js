// const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

// const { HttpError } = require("../../helpers");
const { HttpError, sendEmail } = require("../../helpers");
// const { BASE_URL } = process.env;
const BASE_URL_FRONT = "https://team-team-yummy.netlify.app/";

// const { SECRET_KEY } = process.env;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(
      401,
      "Your email has already been verified or email not found"
    );
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  const verifiedEmail = {
    to: user.email,
    subject: "Your email verified",
    html: `Congratulation! You have successfully verified your email<br><br>
Please visit our website <a target="_blank" href="${BASE_URL_FRONT}">So Yummy</a>.`,
  };

  await sendEmail(verifiedEmail);

  res.status(201).json({
    message: "Email verified",
  });

  // const payload = {
  //   _id: user._id,
  // };

  // const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  // await User.findByIdAndUpdate(user._id, { token });

  // res.status(201).json({
  //   token,
  //   user: {
  //     id: user._id,
  //     name: user.name,
  //     email: user.email,
  //     avatarURL: user.avatarURL,
  //   },
  // });
};

module.exports = verifyEmail;
