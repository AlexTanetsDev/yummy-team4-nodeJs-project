const express = require("express");

const ctrl = require("../../../controllers/getRecipes");
const { authentificate } = require("../../../middlewares");

const router = express.Router();

/**
 * @swagger
 * /api/recipes/main-page:
 *   get:
 *     description: Recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getMainPageRecipes);

module.exports = router;
