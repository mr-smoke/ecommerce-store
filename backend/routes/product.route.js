import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getReccomendedProducts,
  toggleFeaturedProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getProducts);
router.post("/create", protectRoute, adminRoute, createProduct);
router.delete("/delete/:id", protectRoute, adminRoute, deleteProduct);
router.patch(
  "/toggleFeatured/:id",
  protectRoute,
  adminRoute,
  toggleFeaturedProducts
);
router.patch("/update/:id", protectRoute, adminRoute, updateProduct);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/reccomendations", getReccomendedProducts);

export default router;
