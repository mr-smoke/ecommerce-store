import { useCouponStore } from "../stores/useCouponStore";

const Coupon = ({ coupon, children }) => {
  return (
    <>
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg border border-emerald-500/30 overflow-hidden">
        <div className="p-4 flex flex-col items-center gap-2">
          <h3 className="text-2xl font-semibold text-white">{coupon.name}</h3>
          <p className="text-emerald-300 text-xl font-medium">
            {coupon.discount}% off
          </p>
          <p className="text-gray-400">
            Expires on:{" "}
            {new Date(coupon.expiry).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
          {children}
        </div>
      </div>
    </>
  );
};

export default Coupon;
