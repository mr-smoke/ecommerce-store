import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

const SuggestedProducts = () => {
  const { getSuggestedProducts, products, loading } = useProductStore();

  useEffect(() => {
    getSuggestedProducts();
  }, [getSuggestedProducts]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-sm">
      <h2 className="text-2xl text-emerald-400 font-bold">
        Also Recommended for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-1">
        {loading && <ProductSkeleton count={4} />}
        {!loading && products.map((product) => <Product product={product} />)}
      </div>
    </section>
  );
};

export default SuggestedProducts;
