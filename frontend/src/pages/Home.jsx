import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import Carousel from "../components/Carousel";

const coupons = [
  {
    id: 1,
    name: "10% off on Electronics",
    code: "ELECTRO10",
    expiryDate: "2023-12-31",
  },
  {
    id: 2,
    name: "20% off on Fashion",
    code: "FASHION20",
    expiryDate: "2023-11-30",
  },
  {
    id: 3,
    name: "15% off on Home Appliances",
    code: "HOME15",
    expiryDate: "2024-01-15",
  },
];

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto pt-24 px-2">
      <h1 className="pt-16 text-5xl font-semibold text-center text-emerald-400">
        Explore Categories
      </h1>
      <p className="pt-4 text-center text-gray-300">
        Explore the categories and find the best products
      </p>
      <div className="pt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id + category}
            to={category.href}
            className="relative overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
            <img
              src={category.img}
              alt={category.name}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h2 className="z-20 text-black text-lg font-semibold bg-white capitalize">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
      <div className="pt-12 text-center">
        <Carousel items={coupons}>
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="bg-white rounded-lg shadow-lg p-4 m-2"
            >
              <h3 className="text-lg font-semibold">{coupon.name}</h3>
              <p className="text-gray-600">Code: {coupon.code}</p>
              <p className="text-gray-600">
                Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  );
};

export default Home;
