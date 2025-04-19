import { Link } from "react-router-dom";
import { categories } from "../lib/data";
import Carousel from "../components/Carousel";
import Coupon from "../components/Coupon";

const coupons = [
  {
    id: 1,
    code: "ELECTRO10",
    expiryDate: "2023-12-31",
    discount: 10,
  },
  {
    id: 2,
    code: "FASHION20",
    expiryDate: "2023-11-30",
    discount: 20,
  },
  {
    id: 3,
    code: "HOME15",
    expiryDate: "2024-01-15",
    discount: 15,
  },
];

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto pt-24 px-2">
      <section>
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
      </section>
      <section className="py-12">
        <Carousel length={coupons.length}>
          {coupons.map((coupon) => (
            <Coupon key={coupon.id} coupon={coupon} />
          ))}
        </Carousel>
      </section>
    </main>
  );
};

export default Home;
