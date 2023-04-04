const express = require("express");

const ctrl = require("../../../controllers/favorite");
const { authentificate } = require("../../../middlewares");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Recipes
 *     description: recipes
 */

/**
 * @swagger
 * /api/favorite:
 *   get:
 *     description: favorite
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getAllFavoriteRecipes);

/**
 * @swagger
 * /api/favorite/:recipeId:
 *   patch:
 *     description: update recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.patch("/:recipeId", authentificate, ctrl.addFavoriteRecipe);
/**
 * @swagger
 * /api/favorite/:recipeId:
 *   patch:
 *     description: delete recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:recipeId", authentificate, ctrl.removeFavoriteRecipe);

module.exports = router;
