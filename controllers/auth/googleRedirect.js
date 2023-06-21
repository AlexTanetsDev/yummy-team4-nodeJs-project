const axios = require("axios");
const gravatar = require("gravatar");
const queryString = require("querystring");
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
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);
  const code = urlParams.code;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_url: `${BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code: code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const userEmail = userData.data.email;
  const userName = userData.data.name;
  let user = await User.findOne({ userEmail });

  if (!user) {
    const avatarURL = gravatar.url(userEmail);
    await User.create({
      name: userName,
      email: userEmail,
      avatarURL,
    });
  }

  user = await User.findOne({ userEmail });

  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  return res.redirect(`${FRONT_BASE_URL}/google-redirect/${token} `);
};

module.exports = googleRedirect;
