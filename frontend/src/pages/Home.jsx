import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import Carousel from "../components/Carousel";
import Coupon from "../components/Coupon";
import { useEffect } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import { useProductStore } from "../stores/useProductStore";
import { LuShoppingCart } from "react-icons/lu";

const Home = () => {
  const { coupons, getCoupons, loading, addCouponToUser } = useCouponStore();
  const { getFeaturedProducts, products } = useProductStore();

  useEffect(() => {
    getCoupons();
    getFeaturedProducts();
  }, [getCoupons, getFeaturedProducts]);

  const activeCoupons = coupons.filter((coupon) => coupon.isActive);

  return (
    <main className="max-w-6xl mx-auto pt-24">
      <h1 className="pt-16 text-5xl font-semibold text-center text-emerald-400">
        Explore Our Products
      </h1>
      <p className="pt-4 text-center text-gray-300">
        Discover the latest and greatest products we have to offer. From tech to
        fashion, we have something for everyone.
      </p>
      <section className="pt-12">
        <h2 className="pb-3 text-2xl font-semibold bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-emerald-400">
          Featured Products
        </h2>
        <Carousel length={products.length}>
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
            >
              <div className="bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="object-cover w-full h-48 transition-transform duration-300 ease-in-out hover:scale-110"
                />
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-xl font-semibold text-gray-300">
                    {product.name}
                  </h2>
                  <p className="text-emerald-400 font-bold text-2xl">
                    ${product.price}
                  </p>
                  <button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium p-2 rounded-lg w-full transition duration-150 ease-in-out flex items-center justify-center gap-3"
                    onClick={() => addToCart(product)}
                  >
                    <LuShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>
      <section className="pt-12">
        <h2 className="pb-3 text-2xl font-semibold bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-emerald-400">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      <section className="py-16">
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
