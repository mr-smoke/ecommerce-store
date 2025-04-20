import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import Carousel from "../components/Carousel";
import Coupon from "../components/Coupon";
import { useEffect } from "react";
import { useCouponStore } from "../stores/useCouponStore";

const Home = () => {
  const { coupons, getCoupons, loading, addCouponToUser } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const activeCoupons = coupons.filter((coupon) => coupon.isActive);

  return (
    <main className="max-w-6xl mx-auto pt-24 px-2">
      <section>
        <h1 className="pt-16 text-5xl font-semibold text-center text-emerald-400">
          Explore Categories
        </h1>
        <p className="pt-4 text-center text-gray-300">
          Explore the categories and find the best products
        </p>
        <div className="pt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id + category}
              to={category.href}
              className="relative overflow-hidden bg-white rounded-lg shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
              <img
                src={category.img}
                alt={category.name}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h2 className="z-20 text-black text-lg font-semibold bg-white capitalize">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="py-12">
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
      </section>
    </main>
  );
};

export default Home;
