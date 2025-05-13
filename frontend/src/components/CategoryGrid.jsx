import { Link } from "react-router-dom";
import { categories } from "../lib/data";

const CategoryGrid = () => {
  return (
    <section className="pt-12">
      <h2 className="pb-3 text-2xl font-semibold bg-gradient-to-r text-transparent bg-clip-text from-emerald-300 to-emerald-400">
        Explore Categories
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className="relative overflow-hidden bg-white rounded-lg shadow-lg group"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out z-20">
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
