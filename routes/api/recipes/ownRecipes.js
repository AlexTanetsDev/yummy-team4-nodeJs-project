const express = require("express");

const ctrl = require("../../../controllers/ownRecipes");
const {
  validateBody,
  authentificate,
  uploadCloud,
} = require("../../../middlewares");

const { schemas } = require("../../../models/recipe");

const router = express.Router();

router.get("/", authentificate, ctrl.getAllOwnRecipes);
router.post(
  "/",
  authentificate,
  uploadCloud.single("recipeImage"),
  validateBody(schemas.recipe),
  ctrl.addOwnRecipe
);
router.delete("/", authentificate, ctrl.removeOwnRecipe);

module.exports = router;
