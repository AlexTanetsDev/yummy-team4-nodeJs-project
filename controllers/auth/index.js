const { controllersWrapper } = require("../../helpers");
const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");
const login = require("./login");
const updateAvatar = require("./updateAvatar");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const forgotPassword = require("./forgotPassword");
const verifyResetEmail = require("./verifyResetEmail");
const resetPassword = require("./resetPassword");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");

module.exports = {
  register: controllersWrapper(register),
  verifyEmail: controllersWrapper(verifyEmail),
  resendVerifyEmail: controllersWrapper(resendVerifyEmail),
  login: controllersWrapper(login),
  updateAvatar: controllersWrapper(updateAvatar),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
  forgotPassword: controllersWrapper(forgotPassword),
  verifyResetEmail: controllersWrapper(verifyResetEmail),
  resetPassword: controllersWrapper(resetPassword),
  googleAuth: controllersWrapper(googleAuth),
  googleRedirect: controllersWrapper(googleRedirect),
};
