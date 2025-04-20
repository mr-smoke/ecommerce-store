import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCouponStore = create((set) => ({
  coupons: [],
  userCoupons: [],
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
  updateCoupon: async (coupon) => {
    set({ loading: true });

    try {
      const response = await axios.put(`/coupon/update/${coupon._id}`, coupon);
      set((state) => ({
        coupons: state.coupons.map((c) =>
          c._id === coupon._id ? response.data : c
        ),
      }));
      toast.success("Coupon updated successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Failed to update coupon!");
    } finally {
      set({ loading: false });
    }
  },
  deleteCoupon: async (id) => {
    set({ loading: true });

    try {
      await axios.delete(`/coupon/delete/${id}`);
      set((state) => ({
        coupons: state.coupons.filter((coupon) => coupon._id !== id),
      }));
      toast.success("Coupon deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Failed to delete coupon!");
    } finally {
      set({ loading: false });
    }
  },
  getUserCoupons: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/coupon/user");
      set({ userCoupons: response.data });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch coupons!");
    } finally {
      set({ loading: false });
    }
  },
  addCouponToUser: async (coupon) => {
    set({ loading: true });

    try {
      const response = await axios.post(`/coupon/add/${coupon._id}`);
      set((state) => ({
        userCoupons: [...state.userCoupons, { ...coupon, isUsed: false }],
      }));
      toast.success("Coupon added to user successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Failed to add coupon!");
    } finally {
      set({ loading: false });
    }
  },
}));
