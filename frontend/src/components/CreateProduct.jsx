import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import { toast } from "react-hot-toast";
import { useProductStore } from "../stores/useProductStore";

const CreateProduct = () => {
  const { createProduct } = useProductStore();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    image: "",
  });

  const handleImageUpload = (e) => {
    const MAX_SIZE = 1024 * 1024;
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image.");
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.error("File size exceeds 1MB. Please upload a smaller image.");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.onerror = () => {
        toast.error("Error uploading image. Please try again.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(productData);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      image: "",
    });
  };

  return (
    <div className="flex justify-center mb-8">
      <form className="bg-gray-800 shadow p-10 rounded-lg flex flex-col gap-3 sm:w-96">
        <div className="flex">
          <label
            htmlFor="image"
            className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out text-center font-medium"
          >
            {formData.image ? "Product Image Uploaded" : "Upload Product Image"}
          </label>
          <input
            type="file"
            id="image"
            className="sr-only bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
            placeholder="Upload product image"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <label htmlFor="name" className="text-gray-300 font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
            placeholder="Enter product name"
            required
            maxLength="32"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-gray-300 font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
            placeholder="Enter product description"
            rows="4"
            required
            maxLength="100"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="price" className="text-gray-300 font-medium">
            Price
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
            placeholder="Enter product price"
            required
            max="1000000"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="category" className="text-gray-300 font-medium">
            Category
          </label>
          <select
            id="category"
            className="bg-gray-600 text-gray-300 w-full outline-none border border-transparent focus:outline-none rounded-lg p-2"
            placeholder="Enter product category"
            required
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="" disabled selected>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="text-gray-300 font-medium">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            className="bg-gray-600 text-gray-300 w-full outline-none p-2 rounded-lg"
            placeholder="Enter product quantity"
            max="1000000"
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
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
