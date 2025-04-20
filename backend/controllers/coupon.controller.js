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
  const couponId = req.params.id;

  try {
    const userId = req.user._id;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    const user = await User.findById(userId);

    const alreadyHasCoupon = user.coupons.some(
      (c) => c._id.toString() === coupon._id.toString()
    );

    if (alreadyHasCoupon) {
      return res.status(400).json({ error: "You already have this coupon" });
    }

    user.coupons.push(coupon._id);
    await user.save();

    res.json({ message: "Coupon added to user successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCoupons = async (req, res) => {
  try {
    await Coupon.updateMany(
      { expiry: { $lt: new Date() } },
      { $set: { isActive: false } }
    );

    const coupons = await Coupon.find({
      _id: { $in: req.user.coupons },
      isActive: true,
    });

    const userCoupons = coupons
      .map((coupon) => {
        const userCoupon = req.user.coupons.find((c) => c.id === coupon.id);
        return { ...coupon.toJSON(), used: userCoupon.used };
      })
      .filter((coupon) => !coupon.used);

    res.json(userCoupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ isPromotional: true }).sort({
      createdAt: -1,
    });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCoupon = async (req, res) => {
  const couponId = req.params.id;

  try {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    await Coupon.deleteOne({ _id: couponId });

    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCoupon = async (req, res) => {
  const couponId = req.params.id;
  const { name, expiry, discount } = req.body;

  try {
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    coupon.name = name || coupon.name;
    coupon.expiry = expiry || coupon.expiry;
    coupon.discount = discount || coupon.discount;
    coupon.isActive = true;

    await coupon.save();

    res.json(coupon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
