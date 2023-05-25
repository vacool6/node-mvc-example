const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
//
const userRouter = require("./routes/user");
const vehicleRouter = require("./routes//vehicle");
const accessoriesRouter = require("./routes/accessories");

// Middleware's
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/sample")
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("ERROR!"));

//Routes
app.use("/", userRouter);
app.use("/", vehicleRouter);
app.use("/accessories", accessoriesRouter);

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
