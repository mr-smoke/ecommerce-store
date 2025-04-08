import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,

  signup: async (userData) => {
    set({ loading: true });

    try {
      if (userData.password !== userData.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }

      const response = await axios.post("/auth/signup", userData);
      set({ user: response.data });
      toast.success("Signup successful!");
    } catch (error) {
      toast.error(error.response.data.error || "Signup failed!");
    } finally {
      set({ loading: false });
    }
  },
}));
