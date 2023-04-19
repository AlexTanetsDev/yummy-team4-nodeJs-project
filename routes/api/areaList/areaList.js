const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/areaList");
const { authentificate } = require("../../../middlewares");

router.get("/", authentificate, ctrl.getAreaList);

module.exports = router;
