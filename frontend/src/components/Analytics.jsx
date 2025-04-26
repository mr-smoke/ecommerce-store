import {
  LuUsers,
  LuShoppingBag,
  LuShoppingCart,
  LuBadgeDollarSign,
} from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userCount: 0,
    productCount: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.userCount}
          icon={LuUsers}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.productCount}
          icon={LuShoppingBag}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales}
          icon={LuShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={analyticsData.totalRevenue}
          icon={LuBadgeDollarSign}
        />
      </section>
      <section className="bg-gray-800 shadow p-10 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalSales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalRevenue"
              stroke="#3B82F6"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </>
  );
};

export default Analytics;

const AnalyticsCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-gray-800 text-gray-300 p-4 rounded-lg relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 to-emerald-900 opacity-30"></div>
      <h2 className="text-sm font-medium text-emerald-300">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
      <Icon className="text-8xl text-emerald-800 absolute top-0 right-0" />
    </div>
  );
};
