const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/cotegories");

/**
 * @swagger
 * tags:
 *   - name: CategoriesList
 *     description: recipe categories
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     description: recipe categories
 *     tags: [CategoriesList]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", ctrl.getCategoryList);

module.exports = router;
