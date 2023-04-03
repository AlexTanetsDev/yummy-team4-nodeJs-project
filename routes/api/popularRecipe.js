const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/getPopularRecipe");

const { authentificate } = require("../../middlewares");
router.get("/", authentificate, ctrl.getPopularRecipe);

module.exports = router;
