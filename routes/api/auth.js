const express = require("express");
const ctrl = require("../../controllers/auth");
const {
  validateBody,
  authentificate,
  uploadCloud,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post(
  "/update",
  authentificate,
  uploadCloud.single("avatar"),
  ctrl.update
);
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout);
module.exports = router;
