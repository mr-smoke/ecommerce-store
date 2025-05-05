import { useState } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import Button from "./Button";
import FormContainer from "./forms/FormContainer";
import TextInput from "./forms/TextInput";
import NumberInput from "./forms/NumberInput";

const CreateCoupon = () => {
  const { createCoupon, loading } = useCouponStore();
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expiry: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCoupon(formData);
    setFormData({ name: "", discount: "", expiry: "" });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      className="sm:flex-row self-center py-6 sm:w-max"
    >
      <TextInput
        id="name"
        type="text"
        value={formData.name}
        placeholder="Coupon Name"
        required
        minLength={6}
        maxLength={12}
        onChange={handleChange}
      />
      <NumberInput
        id="discount"
        type="number"
        value={formData.discount}
        placeholder="Discount %"
        required
        min="1"
        max="100"
        onChange={handleChange}
      />
      <NumberInput
        id="expiry"
        type="date"
        value={formData.expiry}
        required
        min={new Date().toISOString().split("T")[0]}
        onChange={handleChange}
      />
      <Button type="submit" loading={loading} text="Create Coupon" />
    </FormContainer>
  );
};

export default CreateCoupon;
