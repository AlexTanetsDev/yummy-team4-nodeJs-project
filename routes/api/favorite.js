const express = require("express");

const ctrl = require("../../controllers/favorite");
const { authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/", authentificate, ctrl.getAllFavoriteRecipes);
router.patch("/:recipeId", authentificate, ctrl.addFavoriteRecipe);
router.delete("/:recipeId", authentificate, ctrl.removeFavoriteRecipe);

module.exports = router;
