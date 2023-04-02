const express = require("express");

const ctrl = require("../../controllers/ingredients");

const { validateBody, authentificate } = require("../../middlewares");

const { schemas } = require("../../models/ingredient");

const router = express.Router();

router.get(
  "/",
  authentificate,
  validateBody(schemas.getIngredientSchema),
  ctrl.ingredientRecipes
);

module.exports = router;
