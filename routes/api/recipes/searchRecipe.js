const express = require("express");

const ctrl = require("../../../controllers/getRecipes");

const { validateBody, authentificate } = require("../../../middlewares");

const router = express.Router();

router.get("/title", authentificate, validateBody, ctrl.searchRecipesByTitle);
router.get(
  "/ingredient",
  authentificate,
  validateBody,
  ctrl.searchRecipesByIngredient
);

module.exports = router;
