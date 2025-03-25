import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";

const Category = () => {
  const product = {
    name: "Category 1",
    img: "/category1.jpg",
  };

  return (
    <main className="max-w-6xl mx-auto pt-24 px-2 flex flex-col gap-8">
      <h1 className="text-3xl font-semibold text-center text-emerald-400 pt-16">
        Category Name
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-md flex flex-col gap-4 p-6">
          <img
            src={product.img}
            alt={product.name}
            className="object-cover w-full h-48 rounded-lg"
          />
          <h2 className="text-xl font-semibold text-gray-300">
            {product.name}
          </h2>
          <p className="text-emerald-400 font-bold text-2xl">$19.99</p>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font- p-2 rounded-lg w-full transition duration-150 ease-in-out flex items-center justify-center gap-3">
            <LuShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default Category;
