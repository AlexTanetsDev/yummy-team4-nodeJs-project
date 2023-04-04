const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/cotegories");

router.get("/", ctrl.getCategoryList);

module.exports = router;
