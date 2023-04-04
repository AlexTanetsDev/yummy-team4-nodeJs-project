const { controllersWrapper } = require("../../helpers");
const register = require('./register');
const verifyEmail = require('./verifyEmail');
const resendVerifyEmail = require('./resendVerifyEmail');
const login = require('./login');
const updateAvatar = require('./updateAvatar');
const getCurrent = require('./getCurrent');
const logout = require('./logout');

module.exports = {
  register: controllersWrapper(register),
  verifyEmail: controllersWrapper(verifyEmail),
  resendVerifyEmail: controllersWrapper(resendVerifyEmail),
  login: controllersWrapper(login),
  updateAvatar: controllersWrapper(updateAvatar),
  getCurrent: controllersWrapper(getCurrent),
  logout: controllersWrapper(logout),
};