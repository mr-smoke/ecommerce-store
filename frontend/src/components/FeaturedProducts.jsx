import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import Carousel from "../components/Carousel";
import Product from "../components/Product";

const FeaturedProducts = () => {
  const { getFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    getFeaturedProducts();
  }, [getFeaturedProducts]);

  if (products.length === 0) return null;

  return (
    <section className="pt-12">
      <h2 className="pb-3 text-2xl font-semibold bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-emerald-400">
        Featured Products
      </h2>
      {loading ? (
        <div className="flex">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
            >
              <div className="animate-pulse bg-gray-900 bg-opacity-30 backdrop-blur-sm border border-gray-700 rounded-lg shadow-md flex flex-col overflow-hidden">
                <div className="h-48 bg-gray-700" />
                <div className="p-6 flex flex-col gap-4">
                  <div className="h-7 bg-gray-700 rounded w-1/2" />
                  <div className="h-8 bg-gray-700 rounded w-full" />
                  <div className="h-10 bg-gray-700 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Carousel length={products.length}>
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2"
            >
              <Product product={product} />
            </div>
          ))}
        </Carousel>
      )}
    </section>
  );
};

export default FeaturedProducts;
