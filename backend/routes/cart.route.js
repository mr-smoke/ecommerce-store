import express from "express";
import { addToCart } from "../controllers/cart.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add/:id", protectRoute, addToCart);

export default router;
