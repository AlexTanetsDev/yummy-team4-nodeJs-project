const express = require("express");

const ctrl = require("../../controllers/ingredients");

const { authentificate } = require("../../middlewares");

const router = express.Router();

router.get("/", authentificate, ctrl.ingredientRecipes);

module.exports = router;
