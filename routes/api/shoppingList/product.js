const express = require("express");
const router = express.Router();
const {
  validateBody,
  authentificate,
  isValidId,
} = require("../../../middlewares");

const ctrl = require("../../../controllers/shoppingList");
const { schemas } = require("../../../models/product");
/**
 * @swagger
 * tags:
 *   - name: Shopping List
 *     description: Shopping List
 */

/**
 * @swagger
 * /api/shoping-list:
 *   get:
 *     description: product
 *     tags: [Shopping List]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getProductList);

/**
 * @swagger
 * /api/shoping-list:
 *   post:
 *     description: add product
 *     tags: [Shopping List]
 *     responses:
 *       200:
 *         description: Success
 */

router.post(
  "/",
  authentificate,
  validateBody(schemas.product),
  ctrl.addProduct
);

/**
 * @swagger
 * /api/shoping-list:
 *   delete:
 *     description: delete product
 *     tags: [Shopping List]
 *     responses:
 *       200:
 *         description: Success
 */

router.delete("/:id", authentificate, isValidId, ctrl.removeProduct);

module.exports = router;
