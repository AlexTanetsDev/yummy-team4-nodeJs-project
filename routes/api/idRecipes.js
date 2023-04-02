const express = require("express");
const getById = require("../../controllers/idRecipes");

const router = express.Router();

router.get("/:Id", getById);

module.exports = router;