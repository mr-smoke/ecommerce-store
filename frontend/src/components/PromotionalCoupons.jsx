import { useEffect } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import Carousel from "../components/Carousel";
import Coupon from "../components/Coupon";
import Button from "./Button";

const PromotionalCoupons = () => {
  const { coupons, getCoupons, addCouponToUser, loading } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const activeCoupons = coupons.filter((coupon) => coupon.isActive);

  if (!loading && activeCoupons.length === 0) return null;

  if (loading) {
    return (
      <section className="py-16">
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
      </section>
    );
  }

  return (
    <section className="py-16 text-center">
      <Carousel length={activeCoupons.length}>
        {activeCoupons.map((coupon) => (
          <div
            key={coupon._id}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
          >
            <Coupon coupon={coupon}>
              <Button
                type="button"
                loading={loading}
                text="Claim Coupon"
                onClick={() => addCouponToUser(coupon)}
                className="w-max mt-2"
              />
            </Coupon>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default PromotionalCoupons;
