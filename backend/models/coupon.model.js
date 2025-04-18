import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minlength: 6,
      maxlength: 12,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    expiry: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isPromotional: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
