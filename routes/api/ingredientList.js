const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/ingredientList");

const { authentificate } = require("../../middlewares");

router.get("/", authentificate, ctrl.getAllIngredients);

module.exports = router;
