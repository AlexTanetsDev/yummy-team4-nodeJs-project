const express = require("express");
const router = express.Router();

const ctrl = require("../../../controllers/getRecipes");

const { authentificate, isValidId } = require("../../../middlewares");

router.get("/:category", authentificate, ctrl.getRecepiesByCategory);

router.get("/:id", authentificate, isValidId, ctrl.getRecipesById);

module.exports = router;
