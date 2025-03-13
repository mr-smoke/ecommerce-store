import express from "express";
import { createCoupon } from "../controllers/coupon.controller.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, adminRoute, createCoupon);

export default router;
