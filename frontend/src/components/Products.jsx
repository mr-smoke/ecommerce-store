import { LuPackageOpen, LuSettings, LuStar, LuTrash2 } from "react-icons/lu";
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import UpdateProduct from "./UpdateProduct";
import CreateProduct from "./CreateProduct";
import Button from "./Button";
import DataTable from "./DataTable";

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

  const columns = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
    { key: "featured", label: "Featured" },
    { key: "actions", label: "Actions" },
  ];

  const tableRows = (product) => (
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
            <p className="text-xs text-gray-400">ID: {product._id.slice(-6)}</p>
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
  );

  return (
    <DataTable
      tableTitle="products"
      Icon={LuPackageOpen}
      loading={loading}
      columns={columns}
      data={products}
      tableRows={tableRows}
      searchFields={["name", "category"]}
      onRefresh={getProducts}
      addButtonModal={<CreateProduct />}
    />
  );
};

export default Products;
