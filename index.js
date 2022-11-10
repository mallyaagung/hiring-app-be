require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const createError = require("http-errors");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use("/img", express.static("./upload/photo"));

app.use(require("./src/routes/auth.route"));
app.use(require("./src/routes/user.route"));
app.use(require("./src/routes/skill.route"));
app.use(require("./src/routes/experience.route"));
app.use(require("./src/routes/project.route"));

app.get("/", (req, res) => {
  res.json(`Hiring App Api v1.0`);
});

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});
app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
  next();
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port : ${port}`);
});
