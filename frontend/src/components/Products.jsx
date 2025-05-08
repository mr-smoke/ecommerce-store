import {
  LuCirclePlus,
  LuLoader,
  LuPackageOpen,
  LuSearch,
  LuRefreshCw,
  LuSettings,
  LuStar,
  LuTrash2,
} from "react-icons/lu";
import { useProductStore } from "../stores/useProductStore";
import { useEffect, useState, useCallback } from "react";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import { debounce } from "lodash";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import Button from "./Button";

const Products = () => {
  const {
    products,
    getProducts,
    loading,
    deleteProduct,
    toggleFeaturedProducts,
  } = useProductStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  console.log("Products", products);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, searchTerm]);

  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  const SortableHeader = ({ column, label }) => (
    <th
      className="px-6 py-3 border-b-2 cursor-pointer select-none hover:bg-gray-600"
      onClick={() => requestSort(column)}
    >
      <div className="flex items-center">
        {label}
        {sortConfig.key === column && (
          <span className="ml-1">
            {sortConfig.direction === "ascending" ? "↑" : "↓"}
          </span>
        )}
      </div>
    </th>
  );

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center relative">
          <LuSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            text="Refresh"
            icon={LuRefreshCw}
            className="bg-gray-600 hover:bg-gray-700"
            onClick={() => getProducts()}
            loading={loading}
          />
          <Modal>
            <ModalTrigger>
              <Button
                type="button"
                text="Add Product"
                icon={LuCirclePlus}
                className="min-w-max"
              />
            </ModalTrigger>
            <ModalContent>
              <CreateProduct />
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full bg-gray-800">
          <thead className="bg-gray-700 text-gray-300 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
            <tr>
              <SortableHeader column="name" label="Product" />
              <SortableHeader column="price" label="Price" />
              <SortableHeader column="category" label="Category" />
              <th className="px-6 py-3 border-b-2">Featured</th>
              <th className="px-6 py-3 border-b-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-300 text-sm divide-y divide-gray-700">
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
            {!loading && filteredProducts.length === 0 && (
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
              filteredProducts.map((product) => (
                <tr
                  className="hover:bg-gray-700 transition-colors duration-150"
                  key={product._id}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={product.photo}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-gray-400">
                          ID: {product._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-sm rounded-full bg-gray-700">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      type="button"
                      onClick={() => toggleFeaturedProducts(product._id)}
                      icon={LuStar}
                      className={`w-max !p-2 !rounded-full ${
                        product.featured
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                    <Modal>
                      <ModalTrigger>
                        <Button
                          type="button"
                          icon={LuSettings}
                          className="!bg-blue-600 hover:!bg-blue-700 w-max !p-2 !rounded-full"
                        />
                      </ModalTrigger>
                      <ModalContent>
                        <UpdateProduct product={product} />
                      </ModalContent>
                    </Modal>
                    <Button
                      type="button"
                      icon={LuTrash2}
                      className="!bg-red-600 hover:!bg-red-700 w-max !p-2 !rounded-full"
                      onClick={() => deleteProduct(product._id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {filteredProducts.length > 0 && (
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </section>
  );
};

export default Products;
