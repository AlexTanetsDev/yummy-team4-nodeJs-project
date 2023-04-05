const express = require("express");
const router = express.Router();
const { validateBody, authentificate } = require("../../../middlewares");
const { schemas } = require("../../../models/user");
const ctrl = require("../../../controllers/subscribe/subscribe");

/**
 * @swagger
 * tags:
 *   - name: Subscribe
 *     description: subscribe news
 */

/**
 * @swagger
 * /api/subscribe:
 *   post:
 *     description: subscribe
 *     tags: [Subscribe]
 *     responses:
 *       200:
 *         description: Success
 */

router.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);
module.exports = router;
