import { useState, useEffect } from "react";
import { LuCircleCheckBig, LuSettings, LuTrash2 } from "react-icons/lu";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import CreateCoupon from "./CreateCoupon";
import UpdateCoupon from "./UpdateCoupon";
import { useCouponStore } from "../stores/useCouponStore";

const Coupons = () => {
  const { coupons, getCoupons, loading } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  return (
    <div className="flex flex-col gap-4">
      <CreateCoupon />
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
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(coupon.expiry).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
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
