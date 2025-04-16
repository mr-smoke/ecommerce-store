import { useState } from "react";
import { LuCircleCheckBig, LuSettings, LuTrash2 } from "react-icons/lu";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import UpdateCoupon from "./UpdateCoupon";

const Coupons = () => {
  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expiry: "",
  });

  const loading = false;
  const coupons = [
    {
      _id: "1",
      name: "Summer Sale",
      discount: 20,
      expiry: "2023-12-31",
      isActive: true,
    },
    {
      _id: "2",
      name: "Winter Sale",
      discount: 15,
      expiry: "2024-01-31",
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-col sm:flex-row self-center gap-4 bg-gray-800 shadow py-6 p-10 rounded-lg">
        <input
          type="text"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          placeholder="Coupon Name"
          required
          minLength="6"
          maxLength="12"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 min-w-32"
          placeholder="Discount %"
          required
          min="1"
          max="100"
          onChange={(e) =>
            setFormData({ ...formData, discount: e.target.value })
          }
        />
        <input
          type="date"
          className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          required
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
        />
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
          Create Coupon
        </button>
      </form>
      <table className="min-w-full rounded-lg overflow-hidden bg-gray-800">
        <thead className="bg-gray-700 text-gray-300 text-left text-xs leading-4 font-semibold uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3 border-b-2">Name</th>
            <th className="px-6 py-3 border-b-2">Discount</th>
            <th className="px-6 py-3 border-b-2">Expiry</th>
            <th className="px-6 py-3 border-b-2">Activation</th>
            <th className="px-6 py-3 border-b-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-300 text-sm">
          {loading && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
          {coupons.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No coupon found
              </td>
            </tr>
          )}
          {coupons.map((coupon) => (
            <tr className="hover:bg-gray-700" key={coupon._id}>
              <td className="px-6 py-4 whitespace-nowrap font-semibold">
                {coupon.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {coupon.discount}%
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{coupon.expiry}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className={`text-white font-bold py-2 px-4 rounded transition-colors duration-200
                ${
                  coupon.isActive
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
                >
                  <LuCircleCheckBig />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
                <Modal>
                  <ModalTrigger>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                      <LuSettings />
                    </button>
                  </ModalTrigger>
                  <ModalContent>
                    <UpdateCoupon coupon={coupon} />
                  </ModalContent>
                </Modal>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200">
                  <LuTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coupons;
