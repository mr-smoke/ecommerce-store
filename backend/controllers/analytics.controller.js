import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

const getAnalyticsData = async () => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();

    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const { totalSales, totalRevenue } = salesData[0];

    return {
      userCount,
      productCount,
      totalSales: totalSales || 0,
      totalRevenue: totalRevenue || 0,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDailySalesData = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const dates = getDatesInRange(startDate, endDate);

    return dates.map((date) => {
      const data = dailySalesData.find((item) => item._id === date);

      return {
        date,
        totalSales: data ? data.totalSales : 0,
        totalRevenue: data ? data.totalRevenue : 0,
      };
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const getAnalytics = async (req, res) => {
  try {
    const analyticsData = await getAnalyticsData();
    const dailySalesData = await getDailySalesData();

    res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
