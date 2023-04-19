const { controllersWrapper } = require("../../helpers");
const getAreaList = require("./areaList");

module.exports = {
  getAreaList: controllersWrapper(getAreaList),
};
