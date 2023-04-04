const express = require("express");

const ctrl = require("../../../controllers/getRecipes");

const { validateBody, authentificate } = require("../../../middlewares");

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

router.get("/title", authentificate, validateBody, ctrl.searchRecipesByTitle);
/**
 * @swagger
 * /api/ingredient:
 *   get:
 *     description: search recipes by ingredient
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/ingredient",
  authentificate,
  validateBody,
  ctrl.searchRecipesByIngredient
);

module.exports = router;
