import {
  LuCircleCheckBig,
  LuSettings,
  LuTicketX,
  LuTrash2,
} from "react-icons/lu";
import { useEffect } from "react";
import { useCouponStore } from "../stores/useCouponStore";
import { Modal, ModalTrigger, ModalContent } from "./Modal";
import UpdateCoupon from "./UpdateCoupon";
import CreateCoupon from "./CreateCoupon";
import Button from "./Button";
import DataTable from "./DataTable";

const Coupons = () => {
  const { coupons, getCoupons, deleteCoupon, loading } = useCouponStore();

  useEffect(() => {
    getCoupons();
  }, [getCoupons]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "discount", label: "Discount" },
    { key: "expiry", label: "Expiry" },
    { key: "activation", label: "Activation" },
    { key: "actions", label: "Actions" },
  ];

  const tableRows = (coupon) => (
    <tr
      className="hover:bg-gray-700 transition-colors duration-150"
      key={coupon._id}
    >
      <td className="px-6 py-4 whitespace-nowrap font-semibold">
        {coupon.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{coupon.discount}%</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {new Date(coupon.expiry).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Button
          type="button"
          icon={LuCircleCheckBig}
          className={`w-max !p-2 !rounded-full ${
            coupon.isActive
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        />
      </td>
      <td className="px-6 py-4 whitespace-no-wrap flex gap-2">
        <Modal>
          <ModalTrigger>
            <Button
              type="button"
              icon={LuSettings}
              className="!bg-blue-600 hover:!bg-blue-700 w-max !p-2 !rounded-full"
            />
          </ModalTrigger>
          <ModalContent>
            <UpdateCoupon coupon={coupon} />
          </ModalContent>
        </Modal>
        <Button
          type="button"
          icon={LuTrash2}
          className="!bg-red-600 hover:!bg-red-700 w-max !p-2 !rounded-full"
          onClick={() => deleteCoupon(coupon._id)}
        />
      </td>
    </tr>
  );

  return (
    <DataTable
      tableTitle="coupons"
      Icon={LuTicketX}
      loading={loading}
      columns={columns}
      data={coupons}
      tableRows={tableRows}
      searchFields={["name", "discount"]}
      onRefresh={getCoupons}
      addButtonModal={<CreateCoupon />}
    />
  );
};

export default Coupons;
