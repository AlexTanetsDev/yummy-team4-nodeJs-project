const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");

const authRouter = require("./routes/api/auth/auth");
const subscribeRouter = require("./routes/api/userSubscribe/subscribe");
const ownRecepesRouter = require("./routes/api/recipes/ownRecipes");
const mainPageRecipesRouter = require("./routes/api/recipes/mainPageRecipes");
const categoryListRouter = require("./routes/api/categoryList/categoryList");

const ingredientsListRouter = require("./routes/api/ingredients/ingredientsList");
const productsRouter = require("./routes/api/shoppingList/products");
const ingredientsRouter = require("./routes/api/ingredients/ingredients");
const idRecipesRouter = require("./routes/api/recipes/getRecipesById");
const categoryRecipesRouter = require("./routes/api/recipes/getRecipesByCategory");
const favoriteRouter = require("./routes/api/recipes/favorite");
const searchRouter = require("./routes/api/recipes/searchRecipe");
const popularRecipeRouter = require("./routes/api/recipes/popularRecipe");
const areaListRouter = require("./routes/api/areaList/areaList");

const app = express();

const swaggerDocs = require("./swagger.json");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/ownRecipes", ownRecepesRouter);
app.use("/api/recipes/main-page", mainPageRecipesRouter);
app.use("/api/category-list", categoryListRouter);
app.use("/api/ingredients/list", ingredientsListRouter);
app.use("/api/shopping-list", productsRouter);
app.use("/api/popular-recipe", popularRecipeRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes/category", categoryRecipesRouter);
app.use("/api/recipes/id", idRecipesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/search", searchRouter);
app.use("/api/area-list", areaListRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res) => {
  console.log(404, req.originalUrl);
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
