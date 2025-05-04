import OrderSummary from "../components/OrderSummary";
import CartItems from "../components/CartItems";
import CouponManager from "../components/CouponManager";

const Cart = () => {
  return (
    <main className="max-w-6xl mx-auto px-2 flex flex-col sm:flex-row gap-4 pt-40">
      <div className="sm:w-3/4 flex flex-col gap-4">
        <CartItems />
      </div>
      <div className="sm:w-1/4 flex flex-col gap-4">
        <OrderSummary />
        <CouponManager />
      </div>
    </main>
  );
};

export default Cart;
