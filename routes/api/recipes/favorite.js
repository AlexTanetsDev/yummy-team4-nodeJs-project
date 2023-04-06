const express = require("express");

const ctrl = require("../../../controllers/favorite");
const { authentificate, isValidId } = require("../../../middlewares");

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
 * /api/favorite/:id:
 *   patch:
 *     description: update recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.patch("/:id", authentificate, isValidId, ctrl.addFavoriteRecipe);
/**
 * @swagger
 * /api/favorite/:id:
 *   delete:
 *     description: delete recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:id", authentificate, isValidId, ctrl.removeFavoriteRecipe);

module.exports = router;
