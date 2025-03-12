import express from "express";
import { addToCart, removeFromCart } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add/:id", protectRoute, addToCart);
router.delete("/remove", protectRoute, removeFromCart);

export default router;
