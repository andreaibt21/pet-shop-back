require("dotenv").config();
require("./dbConfig/db");
const express = require("express");
const ProductsRouter = require("./products/router");
const UsersRouter = require("./users/router");

const port = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) =>
  console.log(err ? `Error: ${err} ` : `server on http://localhost:${port}`)
);
app.get("/", (req, res) => {
  res.send("<h1>home app.get</h1>");
});

app.use("/users", UsersRouter);
app.use("/products", ProductsRouter);
app.use("/auth", require("./auth/router"));

app.use((req, res, next) => {
  let error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (!error.status) {
    error.status = 500;
    error.message = "Internal Error Server";
  }
  res
    .status(error.status)
    .json({ status: error.status, message: error.message });
});
