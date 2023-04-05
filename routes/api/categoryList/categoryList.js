const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/categoryList");

/**
 * @swagger
 * tags:
 *   - name: category-list
 *     description: recipe categoryList
 */

/**
 * @swagger
 * /api/category-list:
 *   get:
 *     description: recipe categories
 *     tags: [categories]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", ctrl.getCategoryList);

module.exports = router;
