import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getFeaturedProducts,
  getProductByCategory,
  getReccomendedProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductByCategory);
router.get("/reccomendations", getReccomendedProducts);

export default router;
