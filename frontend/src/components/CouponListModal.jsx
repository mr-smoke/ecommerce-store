import { useEffect } from "react";
import { LuTicketX } from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import { useCouponStore } from "../stores/useCouponStore";
import { useModal } from "./Modal";
import Coupon from "./Coupon";
import Button from "./Button";

const CouponListModal = () => {
  const { applyCoupon } = useCartStore();
  const { userCoupons } = useCouponStore();
  const { closeModal } = useModal();

  if (userCoupons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <LuTicketX size={40} className="text-gray-500 mb-4" />
        <h3 className="text-lg text-gray-300 font-medium mb-2">
          No coupons available
        </h3>
        <p className="text-gray-400 text-sm max-w-xs">
          You don't have any coupons available at the moment. Check back later
          or make a purchase to receive coupons.
        </p>
      </div>
    );
  }

  return (
    <>
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
                closeModal();
              }}
              className="w-max mt-2"
            />
          </Coupon>
        ))}
      </div>
    </>
  );
};

export default CouponListModal;
