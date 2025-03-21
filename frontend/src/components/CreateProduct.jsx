import { useState } from "react";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });

  return (
    <div className="flex justify-center">
      <form className="bg-gray-800 shadow p-10 rounded-lg flex flex-col gap-4 sm:w-96">
        <div>
          <label htmlFor="name" className="text-gray-300 font-medium">
            Product Name
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="text"
              id="name"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Enter product name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="text-gray-300 font-medium">
            Description
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="text"
              id="description"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Enter product description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="price" className="text-gray-300 font-medium">
            Price
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="number"
              id="price"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Enter product price"
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="category" className="text-gray-300 font-medium">
            Category
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="text"
              id="category"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Enter product category"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="quantity" className="text-gray-300 font-medium">
            Quantity
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="number"
              id="quantity"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Enter product quantity"
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="image" className="text-gray-300 font-medium">
            Image
          </label>
          <div className="flex items-center gap-2 bg-gray-600 p-2 rounded-lg">
            <input
              type="file"
              id="image"
              className="bg-gray-600 text-gray-300 w-full outline-none"
              placeholder="Upload product image"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2 rounded-lg w-full mt-4 transition duration-150 ease-in-out"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
