import express from "express";
import {
  addToCart,
  removeFromCart,
  getCartItems,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add/:id", protectRoute, addToCart);
router.delete("/remove", protectRoute, removeFromCart);
router.get("/", protectRoute, getCartItems);

export default router;
