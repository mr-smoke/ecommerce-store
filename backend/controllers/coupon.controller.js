import Coupon from "../models/coupon.model.js";
import User from "../models/user.model.js";

export const createCoupon = async (req, res) => {
  const { name, expiry, discount } = req.body;

  try {
    const existingCoupon = await Coupon.findOne({ name });

    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon already exists" });
    }

    if (new Date(expiry) < new Date()) {
      return res
        .status(400)
        .json({ error: "Expiry date must be in the future" });
    }

    const coupon = new Coupon({ name, expiry, discount });
    await coupon.save();

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  const { name } = req.body;

  try {
    const coupon = await Coupon.findOne({ name });

    if (!coupon) {
      return res.status(400).json({ error: "Coupon not found" });
    }

    if (!coupon.isActive) {
      return res.status(400).json({ error: "Coupon is not active" });
    }

    if (new Date(coupon.expiry) < new Date()) {
      coupon.isActive = false;
      await coupon.save();

      return res.status(400).json({ error: "Coupon has expired" });
    }

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCouponToUser = async (req, res) => {
  const { name } = req.body;

  try {
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ name });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    const user = await User.findById(userId);

    const alreadyHasCoupon = user.coupons.some(
      (c) => c.coupon.toString() === coupon._id.toString()
    );

    if (alreadyHasCoupon) {
      return res.status(400).json({ error: "You already have this coupon" });
    }

    user.coupons.push(coupon._id);
    await user.save();

    res.json({ message: "Coupon added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      _id: { $in: req.user.coupons },
    });

    const userCoupons = coupons.map((coupon) => {
      const userCoupon = req.user.coupons.find((c) => c.id === coupon.id);
      return { ...coupon.toJSON(), used: userCoupon.used };
    });

    res.json(userCoupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
