import { useEffect } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import Carousel from "../components/Carousel";
import Coupon from "../components/Coupon";

const PromotionalCoupons = () => {
  const { coupons, getCoupons, addCouponToUser, loading } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const activeCoupons = coupons.filter((coupon) => coupon.isActive);

  if (activeCoupons.length === 0) return null;

  return (
    <section className="py-16">
      {loading ? (
        <div className="flex">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
            >
              <div className="animate-pulse bg-gray-700 bg-opacity-10 backdrop-blur-sm border border-emerald-700/50 rounded-lg overflow-hidden">
                <div className="p-4 flex flex-col items-center gap-2">
                  <div className="h-8 bg-gray-700 rounded w-3/4" />
                  <div className="h-7 bg-gray-700 rounded w-1/3" />
                  <div className="h-8 bg-gray-700 rounded w-3/4" />
                  <div className="h-10 bg-gray-700 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel length={activeCoupons.length}>
          {activeCoupons.map((coupon) => (
            <div
              key={coupon._id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
            >
              <Coupon coupon={coupon}>
                <button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 mt-2"
                  onClick={() => addCouponToUser(coupon)}
                  disabled={loading}
                >
                  Claim Coupon
                </button>
              </Coupon>
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default PromotionalCoupons;
