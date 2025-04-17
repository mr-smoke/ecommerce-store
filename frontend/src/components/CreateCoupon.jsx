import { useState } from "react";
import { useCouponStore } from "../stores/useCouponStore";

const CreateCoupon = () => {
  const { createCoupon } = useCouponStore();
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

  return (
    <form
      className="flex flex-col sm:flex-row self-center gap-4 bg-gray-800 shadow py-6 p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        placeholder="Coupon Name"
        required
        minLength="6"
        maxLength="12"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="number"
        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-w-32"
        placeholder="Discount %"
        required
        min="1"
        max="100"
        value={formData.discount}
        onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
      />
      <input
        type="date"
        className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        required
        min={new Date().toISOString().split("T")[0]}
        value={formData.expiry}
        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
      />
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
        Create Coupon
      </button>
    </form>
  );
};

export default CreateCoupon;
