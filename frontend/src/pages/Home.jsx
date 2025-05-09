import FeaturedProducts from "../components/FeaturedProducts";
import CategoryGrid from "../components/CategoryGrid";
import PromotionalCoupons from "../components/PromotionalCoupons";

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto pt-24">
      <h1 className="pt-16 text-5xl font-semibold text-center text-emerald-400">
        Explore Our Products
      </h1>
      <p className="pt-4 text-center text-gray-300">
        Discover the latest and greatest products we have to offer. From tech to
        fashion, we have something for everyone.
      </p>
      <FeaturedProducts />
      <CategoryGrid />
      <PromotionalCoupons />
    </main>
  );
};

export default Home;
