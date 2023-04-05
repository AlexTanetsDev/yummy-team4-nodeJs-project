const express = require("express");

const ctrl = require("../../../controllers/ingredients/ingredients");

const { authentificate } = require("../../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     description: ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.ingredientRecipes);

module.exports = router;
