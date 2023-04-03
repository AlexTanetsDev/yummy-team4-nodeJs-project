const express = require("express");

const ctrl = require("../../controllers/auth");
const {
  validateBody,
  authentificate,
  uploadCloud,
} = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     description: register new User
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
/**
 * @swagger
 * /login:
 *   post:
 *     description: login already registered User
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
/**
 * @swagger
 * /update:
 *   post:
 *     description: update info
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  "/update",
  authentificate,
  uploadCloud.single("avatar"),
  ctrl.update
);
/**
 * @swagger
 * /current:
 *   get:
 *     description: current User info
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/current", authentificate, ctrl.getCurrent);
/**
 * @swagger
 * /logout:
 *   post:
 *     description: current User info
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/logout", authentificate, ctrl.logout);

module.exports = router;
