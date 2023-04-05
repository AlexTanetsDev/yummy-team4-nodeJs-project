const express = require("express");

const ctrl = require("../../../controllers/auth");
const {
  authentificate,
  validateBody,
  uploadCloud,
} = require("../../../middlewares");
const { schemas } = require("../../../models/user");
const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: user authorisation
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     description: register new User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
/**
 * @swagger
 * /api/users/verify:
 *   get:
 *     description: verefication token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/verify/:verificationToken", ctrl.verifyEmail);
/**
 * @swagger
 * /api/users/verify/:verificationToken:
 *   post:
 *     description: verefication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: login already registered User
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     description: update info
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.patch(
  "/update",
  authentificate,
  uploadCloud.single("avatar"),
  ctrl.updateAvatar
);
/**
 * @swagger
 * /api/users/current:
 *   get:
 *     description: current User info
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/current", authentificate, ctrl.getCurrent);
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     description: logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/logout", authentificate, ctrl.logout);

module.exports = router;
