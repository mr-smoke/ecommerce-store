import { LuLoader, LuPackageOpen, LuStar, LuTrash2 } from "react-icons/lu";
import { useProductStore } from "../stores/useProductStore";
import { useEffect } from "react";
import Button from "./Button";

const Products = () => {
  const {
    products,
    getProducts,
    loading,
    deleteProduct,
    toggleFeaturedProducts,
  } = useProductStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <table className="min-w-full rounded-lg overflow-hidden bg-gray-800">
      <thead className="bg-gray-700 text-gray-300 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
        <tr>
          <th className="px-6 py-3 border-b-2">Product</th>
          <th className="px-6 py-3 border-b-2">Price</th>
          <th className="px-6 py-3 border-b-2">Category</th>
          <th className="px-6 py-3 border-b-2">Featured</th>
          <th className="px-6 py-3 border-b-2">Delete</th>
        </tr>
      </thead>
      <tbody className="text-gray-300 text-sm">
        {loading && (
          <tr>
            <td colSpan="5" className="text-center py-8">
              <div className="flex justify-center items-center gap-2">
                <LuLoader className="animate-spin w-5 h-5" />
                <span>Loading...</span>
              </div>
            </td>
          </tr>
        )}
        {!loading && products.length === 0 && (
          <tr>
            <td colSpan="5" className="text-center py-8">
              <div className="flex justify-center items-center gap-2">
                <LuPackageOpen className="w-5 h-5" />
                <span>No products found</span>
              </div>
            </td>
          </tr>
        )}
        {!loading &&
          products.map((product) => (
            <tr className="hover:bg-gray-700" key={product._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={product.photo}
                      alt={product.name}
                    />
                  </div>
                  <p className="ml-4 font-semibold">{product.name}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                ${Number(product.price).toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Button
                  type="button"
                  onClick={() => toggleFeaturedProducts(product._id)}
                  icon={LuStar}
                  className={`w-max ${
                    product.featured
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-gray-600 hover:bg-gray-700"
                  }`}
                />
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <Button
                  type="button"
                  icon={LuTrash2}
                  className="bg-red-600 hover:bg-red-700 w-max"
                  onClick={() => deleteProduct(product._id)}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Products;
