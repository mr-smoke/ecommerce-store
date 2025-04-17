import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCouponStore = create((set) => ({
  coupons: [],
  loading: false,

  getCoupons: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/coupon");
      set({ coupons: response.data });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch coupons!");
    } finally {
      set({ loading: false });
    }
  },
  createCoupon: async (coupon) => {
    set({ loading: true });

    try {
      const response = await axios.post("/coupon/create", coupon);
      set((state) => ({ coupons: [...state.coupons, response.data] }));
      toast.success("Coupon created successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Failed to create coupon!");
    } finally {
      set({ loading: false });
    }
  },
}));
