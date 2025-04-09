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
  login: async (userData) => {
    set({ loading: true });

    try {
      const response = await axios.post("/auth/login", userData);
      set({ user: response.data });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response.data.error || "Login failed!");
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });

    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful!");
    } catch (error) {
      toast.error(error.response.data.error || "Logout failed!");
    } finally {
      set({ loading: false });
    }
  },
  getUser: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/auth/get-user");
      set({ user: response.data });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch user!");
    } finally {
      set({ loading: false });
    }
  },
}));
