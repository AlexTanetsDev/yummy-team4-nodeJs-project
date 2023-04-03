const express = require("express");

const ctrl = require("../../controllers/search");

const { validateBody, authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/title", ctrl.searchRecipesByTitle);
router.get("/ingredient", ctrl.searchRecipesByIngredient);


module.exports = router;