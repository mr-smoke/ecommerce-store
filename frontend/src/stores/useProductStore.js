import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const response = await axios.post("/product/create", productData);
      set((state) => ({ products: [...state.products, response.data] }));
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Product creation failed!");
    } finally {
      set({ loading: false });
    }
  },
}));
