// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "pickUpGame-Project";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// Setting currentUser globally
app.use(function (req, res, next) {
  app.locals.currentUser = req.session.user;
  next();
});

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/auth", auth);

// const user = require("./routes/user");
// app.use("/user", user);

const products = require("./routes/product.routes");
app.use("/leagues", leagues);

const profileRoutes = require("./routes/profile.routes");
app.use("/profile", profileRoutes);

const gamesRoutes = require("./routes/games.routes");
app.use("/games", gamesRoutes);

const rankings = require("./routes/rankings.routes");
app.use("/rankings", rankings);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
