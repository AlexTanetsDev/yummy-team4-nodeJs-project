const express = require("express");
const ctrl = require("../../controllers/idRecipes");
const { authentificate, isValidId } = require("../../middlewares");
const router = express.Router();

router.get("/:recipeId", authentificate, isValidId, ctrl.getById);

module.exports = router;
