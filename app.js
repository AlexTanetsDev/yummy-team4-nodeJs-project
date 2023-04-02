const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const ownRecepesRouter = require("./routes/api/ownRecipes");
const mainPageRecipesRouter = require("./routes/api/mainPageRecipes")
const categoryList = require("./routes/api/categoryList");
const idRecipesRouter = require("./routes/api/idRecipes");


const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


app.use("/api/users", authRouter);
app.use("/api/ownRecipes", ownRecepesRouter);
app.use("/api/recipes/main-page", mainPageRecipesRouter);
app.use("/api/category", categoryList);
app.use("/api/recipes", idRecipesRouter);



app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
