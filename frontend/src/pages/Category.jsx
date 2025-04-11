import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { products, loading, getProductsByCategory } = useProductStore();
  const { addToCart } = useCartStore();
  const { id } = useParams();

  useEffect(() => {
    getProductsByCategory(id);
  }, [getProductsByCategory]);

  return (
    <main className="max-w-6xl mx-auto pt-24 px-2 flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-center text-emerald-400 pt-16">
        Category Name
      </h1>
      {products.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-gray-300">No products found in this category.</p>
        </div>
      )}
      {products.map((product) => (
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          key={product._id}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md flex flex-col gap-4 p-6">
            <img
              src={product.photo}
              alt={product.name}
              className="object-cover w-full h-48 rounded-lg"
            />
            <h2 className="text-xl font-semibold text-gray-300">
              {product.name}
            </h2>
            <p className="text-emerald-400 font-bold text-2xl">
              ${product.price}
            </p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font- p-2 rounded-lg w-full transition duration-150 ease-in-out flex items-center justify-center gap-3"
              onClick={() => addToCart(product._id)}
            >
              <LuShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Category;
