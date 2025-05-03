import { Link } from "react-router-dom";
import {
  LuTrash2,
  LuCirclePlus,
  LuCircleMinus,
  LuArrowRight,
  LuBadgeX,
} from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import { useCouponStore } from "../stores/useCouponStore";
import { useEffect } from "react";
import { Modal, ModalTrigger, ModalContent } from "../components/Modal";
import Coupon from "../components/Coupon";
import OrderSummary from "../components/OrderSummary";
import Button from "../components/Button";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateCart,
    applyCoupon,
    removeCoupon,
    coupon,
    loading,
  } = useCartStore();
  const { userCoupons } = useCouponStore();

  return (
    <main className="max-w-6xl mx-auto px-2 flex flex-col gap-8 pt-40">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:w-3/4 flex flex-col gap-4">
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
              <h2 className="text-2xl text-gray-400 font-bold">
                Your cart is empty
              </h2>
              <Link to="/" className="text-emerald-400 underline font-medium">
                Continue Shopping
              </Link>
            </div>
          )}
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex justify-center items-center p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm"
            >
              <img src={product.photo} alt="Product" className="w-24 h-24" />
              <div className="flex flex-col gap-3 flex-1 pl-8">
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-sm text-gray-400">{product.description}</p>
                <button
                  className="text-red-500 w-max"
                  onClick={() => removeFromCart(product._id)}
                >
                  <LuTrash2 size={20} />
                </button>
              </div>
              <div className="px-20">
                <div className="flex justify-center gap-2">
                  <button
                    className="flex items-center text-lg  text-red-500"
                    onClick={() => {
                      if (product.quantity > 1) {
                        updateCart(product._id, product.quantity - 1);
                      } else {
                        removeFromCart(product._id);
                      }
                    }}
                  >
                    <LuCircleMinus />
                  </button>
                  <p className="text-xl">{product.quantity}</p>
                  <button
                    className="flex items-center text-lg text-green-500"
                    onClick={() =>
                      updateCart(product._id, product.quantity + 1)
                    }
                  >
                    <LuCirclePlus />
                  </button>
                </div>
              </div>
              <p className="text-emerald-500 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
        <div className="sm:w-1/4 flex flex-col gap-4">
          <OrderSummary />
          <div className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
            <div>
              <h2 className="text-2xl text-emerald-400 font-bold">
                Use Coupon
              </h2>
              <p className="text-gray-400 text-xs pt-1">
                Apply a coupon code to get a discount on your order.
              </p>
            </div>
            <p className="bg-gray-700 text-gray-400 p-2 rounded-lg pointer-events-none">
              {coupon ? (
                <>
                  <span className="text-emerald-400 font-semibold">
                    {coupon.name} - {coupon.discount}% off
                  </span>
                </>
              ) : (
                <span className="text-gray-400 font-semibold">
                  No coupon applied
                </span>
              )}
            </p>
            <Modal>
              <ModalTrigger>
                <Button type="button" text="View Coupons" />
              </ModalTrigger>
              <ModalContent>
                {userCoupons.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl text-emerald-400 font-bold">
                      Available Coupons
                    </h2>
                    {userCoupons.map((coupon) => (
                      <Coupon key={coupon._id} coupon={coupon}>
                        <Button
                          type="button"
                          text="Apply Coupon"
                          onClick={() => {
                            applyCoupon(coupon._id);
                          }}
                          className="w-max mt-2"
                        />
                      </Coupon>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
                    <h2 className="text-2xl text-gray-400 font-bold">
                      No coupons available
                    </h2>
                  </div>
                )}
              </ModalContent>
            </Modal>
            {coupon && (
              <button
                className="text-red-500 underline font-medium inline-flex items-center justify-center gap-1 text-xs w-max self-center"
                onClick={() => {
                  removeCoupon();
                }}
              >
                Remove Coupon
                <LuBadgeX />
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
