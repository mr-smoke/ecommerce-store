import { Link } from "react-router-dom";
import {
  LuCirclePlus,
  LuShoppingBag,
  LuChartNoAxesCombined,
} from "react-icons/lu";
import { useState } from "react";
import Products from "../components/Products";

const tabs = [
  {
    id: "products",
    name: "Products",
    icon: LuShoppingBag,
  },
  {
    id: "create",
    name: "Create Product",
    icon: LuCirclePlus,
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
          <button
            key={tab.name + tab}
            className={
              `transition-colors duration-200 text-white px-4 py-2 rounded-lg flex items-center gap-2` +
              (activeTab === tab.id ? " bg-emerald-600" : " bg-gray-600")
            }
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>
      {activeTab === "products" && <Products />}
    </main>
  );
};

export default Dashboard;
