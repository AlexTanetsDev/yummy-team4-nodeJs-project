const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/ingredients/ingredientList");

const { authentificate } = require("../../../middlewares");

/**
 * @swagger
 * tags:
 *   - name: Ingredients
 *     description: ingredients
 */

/**
 * @swagger
 * /api/ingredients/list:
 *   get:
 *     description: ingredientList
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getAllIngredients);

module.exports = router;
