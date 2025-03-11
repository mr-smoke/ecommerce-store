import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getReccomendedProducts,
  toggleFeaturedProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/reccomendations", getReccomendedProducts);
router.patch("/toggleFeatured/:id", toggleFeaturedProducts);

export default router;
