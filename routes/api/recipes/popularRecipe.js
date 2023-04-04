const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/getRecipes");

const { authentificate } = require("../../../middlewares");
router.get("/", authentificate, ctrl.getPopularRecipe);

module.exports = router;
