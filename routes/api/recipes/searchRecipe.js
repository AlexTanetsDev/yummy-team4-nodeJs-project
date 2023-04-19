const express = require("express");

const ctrl = require("../../../controllers/getRecipes");

const { authentificate } = require("../../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /api/search/title:
 *   get:
 *     description: search recipes by title
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/title/:title", authentificate, ctrl.searchRecipesByTitle);
/**
 * @swagger
 * /api/search/ingredient:
 *   get:
 *     description: search recipes by ingredient
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/ingredient/:ingredient",
  authentificate,
  ctrl.searchRecipesByIngredient
);

router.get("/area/:area", authentificate, ctrl.searchRecipesByArea);

module.exports = router;
