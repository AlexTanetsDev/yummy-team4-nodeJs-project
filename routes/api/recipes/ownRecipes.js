const express = require("express");

const ctrl = require("../../../controllers/ownRecipes");
const {
  isValidId,
  validateBody,
  authentificate,
  uploadCloud,
} = require("../../../middlewares");

const { schemas } = require("../../../models/recipe");

const router = express.Router();

/**
 * @swagger
 * /api/ownRecipes:
 *   get:
 *     description: Own recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getAllOwnRecipes);

/**
 * @swagger
 * /api/ownRecipes:
 *   post:
 *     description: add own recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  "/",
  authentificate,
  uploadCloud.single("recipeImage"),
  validateBody(schemas.recipe),
  ctrl.addOwnRecipe
);

/**
 * @swagger
 * /api/ownRecipes:
 *   delete:
 *     description: delete own recipe
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:id", authentificate, isValidId, ctrl.removeOwnRecipe);

module.exports = router;
