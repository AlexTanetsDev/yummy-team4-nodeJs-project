const { controllersWrapper } = require("../../helpers");
const getUserStatistics = require("./getStatistics");

module.exports = { getUserStatistics: controllersWrapper(getUserStatistics) };
