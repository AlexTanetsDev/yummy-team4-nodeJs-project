const express = require("express");
const { authentificate } = require("../../../middlewares");
const router = express.Router();

const ctrl = require("../../../controllers/statistic");
router.get("/statistics", authentificate, ctrl.getUserStatistics);

module.exports = router;
