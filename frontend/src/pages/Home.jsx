import { Link } from "react-router-dom";

const categories = [
  {
    href: "/category/1",
    name: "Category 1",
    id: 1,
    img: "/category1.jpg",
  },
  {
    href: "/category/2",
    name: "Category 2",
    id: 2,
    img: "/category2.jpg",
  },
  {
    href: "/category/3",
    name: "Category 3",
    id: 3,
    img: "/category3.jpg",
  },
];

const Home = () => {
  return (
    <main className="max-w-6xl mx-auto min-h-screen pt-24 px-2">
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
            href={category.href}
            className="relative overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
            <img
              src={category.img}
              alt={category.name}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h2 className="z-20 text-black text-lg font-semibold bg-white">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
