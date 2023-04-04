const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDog = require("swagger-jsdoc");

// const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const subscribeRouter = require("./routes/api/subscribe");
const ownRecepesRouter = require("./routes/api/ownRecipes");
const mainPageRecipesRouter = require("./routes/api/mainPageRecipes");
const categoryList = require("./routes/api/categoryList");

const ingredientList = require("./routes/api/ingredientList");
const product = require("./routes/api/product");
const ingredientsRouter = require("./routes/api/ingredients");
const idRecipesRouter = require("./routes/api/idRecipes");
const favoriteRouter = require("./routes/api/favorite");
const searchRouter = require("./routes/api/search");
const popularRecipeRouter = require("./routes/api/popularRecipe");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API docementation So Yummy",
      version: "1.0.0.0",
    },
  },
  apis: ["app.js", "./routes/api/*.js"],
};

const swaggerDocs = swaggerJsDog(swaggerOptions);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/ownRecipes", ownRecepesRouter);
app.use("/api/recipes/main-page", mainPageRecipesRouter);
app.use("/api/category", categoryList);
app.use("/api/ingredients/list", ingredientList);
app.use("/api/shoping-list", product);
app.use("/api/popular-recipe", popularRecipeRouter);
app.use("/api/ingredients", ingredientsRouter);
app.use("/api/recipes", idRecipesRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/search", searchRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
