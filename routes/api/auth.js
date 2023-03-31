const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authentificate } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authentificate, ctrl.getCurrent);
router.post("/logout", authentificate, ctrl.logout);
module.exports = router;
