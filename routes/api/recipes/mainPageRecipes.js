const express = require("express");

const ctrl = require("../../../controllers/getRecipes");
const { authentificate } = require("../../../middlewares");

const router = express.Router();

router.get("/", authentificate, ctrl.getMainPageRecipes);

module.exports = router;
