const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/getRecipes");

const { authentificate } = require("../../../middlewares");

/**
 * @swagger
 * /api/recipes/category/:category:
 *   get:
 *     description: search recipe by category
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/:category", authentificate, ctrl.getRecepiesByCategory);

module.exports = router;
