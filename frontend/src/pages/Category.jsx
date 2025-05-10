import { Link } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuPackageOpen } from "react-icons/lu";
import Product from "../components/Product";
import ProductSkeleton from "../components/ProductSkeleton";

const Category = () => {
  const { products, getProductsByCategory, loading } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    getProductsByCategory(id);
  }, [getProductsByCategory]);

  return (
    <main className="max-w-6xl mx-auto pt-24 px-2 flex flex-col gap-8">
      <h1 className="text-4xl font-semibold text-center text-emerald-400 pt-16">
        {id.charAt(0).toUpperCase() + id.slice(1)} Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {loading && <ProductSkeleton count={4} />}
        {!loading && products.length === 0 && <EmptyCategory />}
        {!loading &&
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))}
      </div>
    </main>
  );
};

export default Category;

const EmptyCategory = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-10 min-h-96">
      <p className="text-gray-300 text-3xl font-semibold text-center">
        No products found in this category.
      </p>
      <LuPackageOpen className="text-gray-300" size={120} />
      <p className="text-gray-400 text-lg">
        Check out our
        <Link
          to="/home"
          className="text-emerald-300 hover:text-emerald-400 font-semibold"
        >
          {" "}
          other categories.
        </Link>
      </p>
    </div>
  );
};
