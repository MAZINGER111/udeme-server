const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const userRoutes = require("./routes/users");

app.get("/", (req, res) => {
  return res.json({ message: "Hi, I am Udeme's server" });
});
app.use("/users", userRoutes);

module.exports = app;
