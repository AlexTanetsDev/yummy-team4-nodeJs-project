const express = require("express");
const { authentificate } = require("../../../middlewares");
const ctrl = require("../../../controllers/areaList");
const router = express.Router();

/**
 * @swagger
 * /api/area-list:
 *   get:
 *     description: area-list
 *     tags: [area-list]
 *     responses:
 *       200:
 *         description: Success
 */

router.get("/", authentificate, ctrl.getAreaList);

module.exports = router;
