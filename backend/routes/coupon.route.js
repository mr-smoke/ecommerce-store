import express from "express";
import {
  createCoupon,
  validateCoupon,
} from "../controllers/coupon.controller.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, adminRoute, createCoupon);
router.post("/validate", protectRoute, validateCoupon);

export default router;
