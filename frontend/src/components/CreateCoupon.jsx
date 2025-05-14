import { useState } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import { useModal } from "./Modal";
import Button from "./Button";
import FormContainer from "./forms/FormContainer";
import TextInput from "./forms/TextInput";
import NumberInput from "./forms/NumberInput";

const CreateCoupon = () => {
  const { createCoupon, loading } = useCouponStore();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expiry: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCoupon(formData);
    setFormData({ name: "", discount: "", expiry: "" });
    closeModal();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <FormContainer onSubmit={handleSubmit} title="Create Coupon">
      <TextInput
        label="Coupon Name"
        id="name"
        type="text"
        value={formData.name}
        placeholder="Enter coupon name"
        required
        minLength={6}
        maxLength={12}
        onChange={handleChange}
      />
      <NumberInput
        label="Discount %"
        id="discount"
        type="number"
        value={formData.discount}
        placeholder="Enter discount percentage"
        required
        min="1"
        max="100"
        onChange={handleChange}
      />
      <NumberInput
        label="Expiry Date"
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
