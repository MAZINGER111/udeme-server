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

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const userRoutes = require("./routes/users");
const projectsRoutes = require("./routes/project");
const blogRoutes = require("./routes/blog");

app.use("/projects", projectsRoutes);
app.use("/blog", blogRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  return res.json({ message: "Hi, I am Udeme's server" });
});

module.exports = app;
