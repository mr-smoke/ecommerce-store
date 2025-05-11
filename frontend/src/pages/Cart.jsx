import OrderSummary from "../components/OrderSummary";
import CartItems from "../components/CartItems";
import CouponManager from "../components/CouponManager";
import SuggestedProducts from "../components/SuggestedProducts";

const Cart = () => {
  return (
    <main className="max-w-6xl mx-auto px-2 flex flex-col gap-4 pt-40 pb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-3/4 flex flex-col gap-4">
          <CartItems />
        </div>
        <div className="sm:w-1/4 flex flex-col gap-4">
          <OrderSummary />
          <CouponManager />
        </div>
      </div>
      <SuggestedProducts />
    </main>
  );
};

export default Cart;
