const express = require("express");

const ctrl = require("../../controllers/recipesForMainPage");
const { authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/main-page", authentificate, ctrl.getRecipesForMainPage);


module.exports = router;