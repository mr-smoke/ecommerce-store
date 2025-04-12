import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set) => ({
  cart: [],
  loading: false,

  getCartItems: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/cart");
      set({ cart: response.data });
    } catch (error) {
      toast.error(error.response.data.error || "Failed to fetch cart items!");
    } finally {
      set({ loading: false });
    }
  },
  addToCart: async (product) => {
    set({ loading: true });

    try {
      const response = await axios.post(`/cart/add/${product._id}`);
      set((state) => {
        const isExisting = state.cart.find((item) => item._id === product._id);
        if (isExisting) {
          return {
            cart: state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error(
        error.response.data.error || "Failed to add product to cart!"
      );
    } finally {
      set({ loading: false });
    }
  },
  removeFromCart: async (productId) => {
    set({ loading: true });

    try {
      await axios.delete(`/cart/remove/${productId}`);
      set((state) => ({
        cart: state.cart.filter((item) => item._id !== productId),
      }));
    } catch (error) {
      toast.error(
        error.response.data.error || "Failed to remove product from cart!"
      );
    } finally {
      set({ loading: false });
    }
  },
  updateCart: async (productId, quantity) => {
    set({ loading: true });

    try {
      await axios.put(`/cart/update/${productId}`, { quantity });
      set((state) => ({
        cart: state.cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      toast.error(error.response.data.error || "Failed to update cart!");
    } finally {
      set({ loading: false });
    }
  },
}));
