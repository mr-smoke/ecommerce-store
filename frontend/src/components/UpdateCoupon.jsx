import { useState } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import { useModal } from "./Modal";
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

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-gray-300 font-medium">
          Coupon Name
        </label>
        <input
          id="name"
          type="text"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          required
          minLength="6"
          maxLength="12"
          defaultValue={coupon.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="discount" className="text-gray-300 font-medium">
          Discount %
        </label>
        <input
          id="discount"
          type="number"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-w-32"
          required
          min="1"
          max="100"
          defaultValue={coupon.discount}
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="expiry" className="text-gray-300 font-medium">
          Expiry Date
        </label>
        <input
          id="expiry"
          type="date"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          required
          min={new Date().toISOString().split("T")[0]}
          defaultValue={coupon.expiry.split("T")[0]}
          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
        />
      </div>
      <Button
        type="submit"
        loading={loading}
        text="Update Coupon"
        className="mt-3"
      />
    </form>
  );
};

export default UpdateCoupon;
