const express = require("express");
const router = express.Router();
const { getAllProducts } = require("../controllers/products");

router.get("/allproducts", getAllProducts);

module.exports = router;
