import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import { toast } from "react-hot-toast";
import { useProductStore } from "../stores/useProductStore";
import { useModal } from "./Modal";
import FormContainer from "./forms/FormContainer";
import TextInput from "./forms/TextInput";
import NumberInput from "./forms/NumberInput";
import TextAreaInput from "./forms/TextAreaInput";
import SelectInput from "./forms/SelectInput";
import FileInput from "./forms/FileInput";
import Button from "./Button";

const CreateProduct = () => {
  const { createProduct, loading } = useProductStore();
  const { closeModal } = useModal();
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

    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProduct(formData);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      image: "",
    });
    closeModal();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Create Product">
      <FileInput
        id="image"
        value={formData.image}
        onChange={handleImageUpload}
      />
      <TextInput
        label="Product Name"
        id="name"
        type="text"
        required
        minLength={3}
        maxLength={32}
        value={formData.name}
        placeholder="Enter product name"
        onChange={handleChange}
      />
      <TextAreaInput
        label="Product Description"
        id="description"
        value={formData.description}
        placeholder="Enter product description"
        required
        minLength={10}
        maxLength={100}
        rows="4"
        onChange={handleChange}
      />
      <NumberInput
        label="Price"
        id="price"
        type="number"
        required
        step="0.01"
        min="0.01"
        max="1000000"
        value={formData.price}
        placeholder="Enter product price"
        onChange={handleChange}
      />
      <SelectInput
        label="Category"
        id="category"
        value={formData.category}
        placeholder="Select product category"
        required
        options={categories}
        onChange={handleChange}
      />
      <NumberInput
        label="Quantity"
        id="quantity"
        type="number"
        required
        min="1"
        max="1000000"
        value={formData.quantity}
        placeholder="Enter product quantity"
        onChange={handleChange}
      />
      <Button type="submit" loading={loading} text="Create" className="mt-0" />
    </FormContainer>
  );
};

export default CreateProduct;
