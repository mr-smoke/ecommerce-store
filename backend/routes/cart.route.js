import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCart,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add/:id", protectRoute, addToCart);
router.delete("/remove/:id", protectRoute, removeFromCart);
router.get("/", protectRoute, getCartItems);
router.put("/update/:id", protectRoute, updateCart);

export default router;
