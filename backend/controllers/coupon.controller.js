import Coupon from "../models/coupon.model.js";

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
