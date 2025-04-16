import { useState } from "react";

const UpdateCoupon = ({ coupon }) => {
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expiry: "",
  });

  return (
    <form className="flex flex-col gap-2">
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
          defaultValue={coupon.expiry}
          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
        />
      </div>
      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 mt-3">
        Update Coupon
      </button>
    </form>
  );
};

export default UpdateCoupon;
