import { LuBadgeX } from "react-icons/lu";
import { useCartStore } from "../stores/useCartStore";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import CouponListModal from "../components/CouponListModal";
import Button from "./Button";

const CouponManager = () => {
  const { removeCoupon, coupon } = useCartStore();

  return (
    <section className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
      <div>
        <h2 className="text-2xl text-emerald-400 font-bold">Discount Coupon</h2>
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
          <span className="text-gray-400 font-semibold">No coupon applied</span>
        )}
      </p>
      <Modal>
        <ModalTrigger>
          <Button type="button" text="View Coupons" />
        </ModalTrigger>
        <ModalContent>
          <CouponListModal />
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
    </section>
  );
};

export default CouponManager;
