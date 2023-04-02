const express = require("express");
const ctrl = require("../../controllers/idRecipes");
const { authentificate, isValidId } = require("../../middlewares");
const router = express.Router();

const ctrlCategory = require("../../controllers/getCategoriesRecepies");
const controllersWrapper = require("../../helpers/controllersWrapper");

router.get(
  "/:category",
  authentificate,
  controllersWrapper(ctrlCategory.getCategoriesRecepies)
);

router.get("/:recipeId", authentificate, isValidId, ctrl.getById);

module.exports = router;
