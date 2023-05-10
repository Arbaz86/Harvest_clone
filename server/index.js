require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { passport } = require("./configs/google-oauth");

const { authController } = require("./routes/auth.routes");
const { clientController } = require("./routes/client.route");
const { timeController } = require("./routes/time.route");
const { projectController } = require("./routes/project.route");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(express.json());
app.use(cors());
app.use("/auth", authController);
app.use("/client", clientController);
app.use("/time", timeController);
app.use("/project", projectController);

app.get("/", (req, res) => {
  res.send("Welcome to the home pages");
});

// google auth route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    res.redirect("/");
  }
);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("> Connected to DB successfully");
  } catch (error) {
    console.log("> Failed to connect to DB :(");
  }
  console.log(`> Server is up and running on port : ${PORT}`);
});
