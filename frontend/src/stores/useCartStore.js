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
  addToCart: async (productId) => {
    set({ loading: true });

    try {
      const response = await axios.post(`/cart/add/${productId}`);
      set((state) => {
        const isExisting = state.cart.find((item) => item._id === productId);
        if (isExisting) {
          return {
            cart: state.cart.map((item) =>
              item._id === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          };
        }
        return { cart: [...state.cart, { ...response.data, quantity: 1 }] };
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
}));
