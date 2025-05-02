import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import Carousel from "../components/Carousel";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";

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
        <ProductSkeleton count={4} />
      ) : (
        <Carousel length={products.length}>
          {products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 p-2"
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
