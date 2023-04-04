const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/getRecipes");

const { authentificate } = require("../../../middlewares");

/**
 * @swagger
 * /api/popular-recipe:
 *   get:
 *     description: Popular recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", authentificate, ctrl.getPopularRecipe);

module.exports = router;
