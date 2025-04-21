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

router.get("/", getCoupons);
router.post("/create", protectRoute, adminRoute, createCoupon);
router.delete("/delete/:id", protectRoute, adminRoute, deleteCoupon);
router.put("/update/:id", protectRoute, adminRoute, updateCoupon);
router.post("/validate/:id", protectRoute, validateCoupon);
router.get("/user", protectRoute, getUserCoupons);
router.post("/add/:id", protectRoute, addCouponToUser);

export default router;
