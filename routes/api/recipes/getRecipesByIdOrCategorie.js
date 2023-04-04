const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/getRecipes");

const { authentificate, isValidId } = require("../../../middlewares");

/**
 * @swagger
 * /api/category/:category:
 *   get:
 *     description: search recipe by category
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/:category", authentificate, ctrl.getRecepiesByCategory);

/**
 * @swagger
 * /api/category/:id:
 *   get:
 *     description: search recipe by id
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/:id", authentificate, isValidId, ctrl.getRecipesById);

module.exports = router;
