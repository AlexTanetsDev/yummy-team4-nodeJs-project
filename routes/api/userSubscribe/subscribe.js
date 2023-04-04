const express = require("express");
const router = express.Router();
const { validateBody, authentificate } = require("../../../middlewares");
const { schemas } = require("../../../models/user");
const ctrl = require("../../../controllers/subscribe/subscribe");

router.patch(
  "/",
  authentificate,
  validateBody(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);
module.exports = router;
