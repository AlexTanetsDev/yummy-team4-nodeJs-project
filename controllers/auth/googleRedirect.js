const axios = require("axios");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const {
  GOOGLE_CLIENT_ID,
  BASE_URL,
  GOOGLE_CLIENT_SECRET,
  FRONT_BASE_URL,
  SECRET_KEY,
} = process.env;

const googleRedirect = async (req, res) => {
  const code = req.query.code;

  console.log("code:", code);
  console.log("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID);
  console.log("GOOGLE_CLIENT_SECRET", GOOGLE_CLIENT_SECRET);
  console.log("BASE_URL", BASE_URL);
  console.log("FRONT_BASE_URL", FRONT_BASE_URL);
  let tokenData;

  try {
    tokenData = await axios({
      url: "https://oauth2.googleapis.com/token",
      method: "post",
      data: {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: `${BASE_URL}/api/users/google-redirect`,
        grant_type: "authorization_code",
      },
    });
  } catch (error) {
    console.log("error:", error.response.data.error);
  }

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name } = userData.data;
  const hashPassword = await bcrypt.hash(nanoid(), 10);
  let user = await User.findOne({ email });

  if (!user) {
    const avatarURL = gravatar.url(email);
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      verify: true,
      verificationToken: " ",
      avatarURL,
    });
  }

  user = await User.findOne({ email });

  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token, verificationToken: "" });

  return res.redirect(`${FRONT_BASE_URL}/google-redirect/${token} `);
};

module.exports = googleRedirect;
