import { Link } from "react-router-dom";
import {
  LuShoppingBag,
  LuChartNoAxesCombined,
  LuTicketPercent,
} from "react-icons/lu";
import { useState } from "react";
import Products from "../components/Products";
import CreateProduct from "../components/CreateProduct";
import Analytics from "../components/Analytics";
import Coupons from "../components/Coupons";
import Button from "../components/Button";

const tabs = [
  {
    id: "products",
    name: "Products",
    icon: LuShoppingBag,
  },
  {
    id: "coupons",
    name: "Coupons",
    icon: LuTicketPercent,
  },
  {
    id: "analytics",
    name: "Analytics",
    icon: LuChartNoAxesCombined,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <main className="max-w-6xl mx-auto px-2 flex flex-col gap-8 pt-24">
      <h1 className="text-3xl font-semibold text-center text-emerald-400 pt-16">
        Admin Dashboard
      </h1>
      <div className="flex justify-center gap-4">
        {tabs.map((tab) => (
          <Button
            key={tab.name + tab}
            type="button"
            text={tab.name}
            icon={tab.icon}
            className={`w-max font-normal ${
              activeTab === tab.id
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      {activeTab === "products" && <Products />}
      {activeTab === "analytics" && <Analytics />}
      {activeTab === "coupons" && <Coupons />}
    </main>
  );
};

export default Dashboard;
