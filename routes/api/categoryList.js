const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/categoryList");

router.get("/", ctrl.getCategoryList);

module.exports = router;
