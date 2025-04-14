import express from "express";
import {
  createCoupon,
  validateCoupon,
  addCouponToUser,
  getUserCoupons,
  getCoupons,
  deleteCoupon,
  updateCoupon,
} from "../controllers/coupon.controller.js";
import { protectRoute, adminRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, adminRoute, createCoupon);
router.post("/validate", protectRoute, validateCoupon);
router.post("/add", protectRoute, addCouponToUser);
router.get("/user", protectRoute, getUserCoupons);
router.get("/", protectRoute, adminRoute, getCoupons);
router.delete("/:id", protectRoute, adminRoute, deleteCoupon);
router.put("/:id", protectRoute, adminRoute, updateCoupon);

export default router;
