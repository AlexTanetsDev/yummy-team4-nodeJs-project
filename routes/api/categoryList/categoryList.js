const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/categoryList");

/**
 * @swagger
 * tags:
 *   - name: Category-list
 *     description: recipe categoryList
 */

/**
 * @swagger
 * /api/category-list:
 *   get:
 *     description: recipe categories
 *     tags: [Category-list]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", ctrl.getCategoryList);

module.exports = router;
