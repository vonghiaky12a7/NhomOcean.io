const express = require("express");
const Product = require("../model/Product");
const router = express.Router();

// API endpoint để lấy danh sách rau
router.get("/", async (req, res) => {
  try {
    console.log("Fetching all products...");
    const products = await Product.find();
    console.log("Products fetched:", products);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

// API endpoint để thêm một loại rau mới
router.post("/", async (req, res) => {
  const product = new Product({
    item: req.body.item,
    price: req.body.price,
    description: req.body.description,
  });

  try {
    console.log("Creating new product:", product);
    const newProduct = await product.save();
    console.log("New product created:", newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
