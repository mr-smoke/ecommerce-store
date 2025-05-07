import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import Button from "./Button";

const stripePromise = loadStripe(
  "pk_test_51R2Xv5RwLwp9iBvsgyH3vB6bOIZZZK19VITe0AojYxVDJdvDCRFZxtmfP5YXuameZ6yUhxrb7OBspIcTP8LrkjYG00fDM99U4t"
);

const OrderSummary = () => {
  const { cart, coupon, total, subtotal } = useCartStore();

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await axios.post("/payment/create-checkout-session", {
      products: cart,
      couponId: coupon ? coupon._id : null,
    });

    const session = await response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
      <h2 className="text-2xl text-emerald-400 font-bold">Order Summary</h2>
      <div className="flex justify-between">
        <p className="text-gray-400">Subtotal:</p>
        <p className="font-semibold">${subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-400">Discount:</p>
        <p className="font-semibold">${(subtotal - total).toFixed(2)}</p>
      </div>
      <div className="flex justify-between border-t border-gray-700 py-2">
        <p className="font-bold">Total:</p>
        <p className="font-bold text-emerald-400">${total.toFixed(2)}</p>
      </div>
      <Button type="button" text="Checkout" onClick={handleCheckout} />
      <Link to="/" className="text-xs text-gray-400 text-center">
        Or{" "}
        <span className="text-emerald-400 underline font-medium inline-flex items-center justify-center gap-1">
          Continue Shopping
          <LuArrowRight />
        </span>
      </Link>
    </div>
  );
};

export default OrderSummary;
