import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useCartStore } from "./useCartStore";

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
  getProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/product");
      set({ products: response.data.products });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch products!");
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });

    try {
      await axios.delete(`/product/delete/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== productId),
      }));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Product deletion failed!");
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (product) => {
    set({ loading: true });

    try {
      const response = await axios.patch(
        `/product/update/${product._id}`,
        product
      );
      set((state) => ({
        products: state.products.map((p) =>
          p._id === product._id ? response.data : p
        ),
      }));
      const cartStore = useCartStore.getState();
      if (cartStore.cart.some((item) => item._id === product._id)) {
        cartStore.getCartItems();
      }
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Product update failed!");
    } finally {
      set({ loading: false });
    }
  },
  getFeaturedProducts: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/product/featured");
      set({ products: response.data.products });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch products!");
    } finally {
      set({ loading: false });
    }
  },
  toggleFeaturedProducts: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.patch(
        `/product/toggleFeatured/${productId}`
      );
      set((state) => ({
        products: state.products.map((product) =>
          product._id === productId
            ? { ...product, featured: response.data.featured }
            : product
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.error || "Product update failed!");
    } finally {
      set({ loading: false });
    }
  },
  getProductsByCategory: async (category) => {
    set({ loading: true });

    try {
      const response = await axios.get(`/product/category/${category}`);
      set({ products: response.data.products });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch products!");
    } finally {
      set({ loading: false });
    }
  },
  getSuggestedProducts: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.get("/product/reccomendations");
      set({ products: response.data.products });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch products!");
    } finally {
      set({ loading: false });
    }
  },
}));
