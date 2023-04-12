const express = require("express");
const router = express.Router();
const {
  validateBody,
  authentificate,
  isValidId,
  uploadCloud,
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
 * /api/shopping-list:
 *   get:
 *     description: product
 *     tags: [Shopping List]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getProductsList);

/**
 * @swagger
 * /api/shopping-list:
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
  uploadCloud.single("image"),
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
