import { useState } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import { useModal } from "./Modal";
import FormContainer from "./forms/FormContainer";
import TextInput from "./forms/TextInput";
import NumberInput from "./forms/NumberInput";
import Button from "./Button";

const UpdateCoupon = ({ coupon }) => {
  const { updateCoupon, loading } = useCouponStore();
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expiry: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name && !formData.discount && !formData.expiry) {
      closeModal();
      return;
    }
    await updateCoupon({
      _id: coupon._id,
      name: formData.name || coupon.name,
      expiry: formData.expiry || coupon.expiry,
      discount: formData.discount || coupon.discount,
    });
    setFormData({
      name: "",
      discount: "",
      expiry: "",
    });
    closeModal();
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      title="Update Coupon"
      className="text-base"
    >
      <TextInput
        label="Coupon Name"
        id="name"
        type="text"
        required
        minLength={6}
        maxLength={12}
        defaultValue={coupon.name}
        onChange={handleChange}
      />
      <NumberInput
        label="Discount %"
        id="discount"
        type="number"
        required
        min="1"
        max="100"
        defaultValue={coupon.discount}
        onChange={handleChange}
      />
      <NumberInput
        label="Expiry Date"
        id="expiry"
        type="date"
        required
        min={new Date().toISOString().split("T")[0]}
        defaultValue={coupon.expiry.split("T")[0]}
        onChange={handleChange}
      />
      <Button type="submit" loading={loading} text="Update" />
    </FormContainer>
  );
};

export default UpdateCoupon;
