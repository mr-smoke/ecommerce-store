import { LuStar, LuTrash2 } from "react-icons/lu";

const Products = () => {
  const featured = true;

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
        <tr className="hover:bg-gray-700">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://via.placeholder.com/150"
                  alt=""
                />
              </div>
              <p className="ml-4 font-semibold">Product Name</p>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">$120.00</td>
          <td className="px-6 py-4 whitespace-nowrap">Category</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              className={`text-white font-bold py-2 px-4 rounded transition-colors duration-200
                ${
                  featured
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
            >
              <LuStar />
            </button>
          </td>
          <td className="px-6 py-4 whitespace-no-wrap">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
              <LuTrash2 />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Products;
