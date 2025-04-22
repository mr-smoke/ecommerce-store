import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subtotal: 0,
  coupon: null,
  loading: false,

  getCartItems: async () => {
    set({ loading: true });

    try {
      const response = await axios.get("/cart");
      set({ cart: response.data });
      get().cartTotal();
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
      get().cartTotal();
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
      get().cartTotal();
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
      get().cartTotal();
    } catch (error) {
      toast.error(error.response.data.error || "Failed to update cart!");
    } finally {
      set({ loading: false });
    }
  },
  cartTotal: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    let total = subtotal;

    if (coupon) {
      total -= (subtotal * coupon.discount) / 100;
    }
    set({ subtotal, total });
  },
  applyCoupon: async (couponId) => {
    try {
      const response = await axios.post(`/coupon/validate/${couponId}`);
      set({ coupon: response.data });
      get().cartTotal();
      toast.success("Coupon applied successfully!");
    } catch (error) {
      toast.error(error.response.data.error || "Failed to apply coupon!");
    }
  },
  removeCoupon: () => {
    set({ coupon: null });
    get().cartTotal();
  },
}));
