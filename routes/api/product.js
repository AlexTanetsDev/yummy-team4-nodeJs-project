const express = require("express");
const router = express.Router();
const {
  validateBody,
  authentificate,
  isValidId,
} = require("../../middlewares");

const ctrl = require("../../controllers/product");
const { schemas } = require("../../models/product");

router.get("/", authentificate, ctrl.getProductList);

router.post(
  "/",
  authentificate,
  validateBody(schemas.product),
  ctrl.addProduct
);

router.delete("/:id", authentificate, isValidId, ctrl.removeProduct);

module.exports = router;
