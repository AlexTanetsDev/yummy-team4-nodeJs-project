const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log(bearer);
  console.log(token);
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    console.log(_id);
    const user = await User.findById(_id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = authentificate;
