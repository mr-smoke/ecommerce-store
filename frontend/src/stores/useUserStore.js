import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

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
    set({ checkingAuth: true });

    try {
      const response = await axios.get("/auth/get-user");
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      set({ checkingAuth: false });
    }
  },
  refreshUser: async () => {
    if (get().checkingAuth) return;
    set({ checkingAuth: true });

    try {
      const response = await axios.post("/auth/refresh-token");
    } catch (error) {
      set({ user: null });
      throw error;
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshUser();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        if (useUserStore.getState().user) {
          useUserStore.getState().logout();
          toast.error("Session expired. Please log in again.");
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
