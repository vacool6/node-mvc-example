const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const productRouter = require("./routes/products");

//
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

//
mongoose
  .connect("mongodb://127.0.0.1:27017/sample")
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("ERROR!"));
//

app.use("/", userRouter);
app.use("/product", productRouter);
// 404 route
app.all("*", (req, res) => {
  res.send("<h1>404 Not found!</h1>");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.log("ERROR>>>", err);
  res.send({ message: "ERROR!" });
});

app.listen(4000, () => console.log("Listening on port 4000"));
