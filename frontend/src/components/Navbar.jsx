import { Link } from "react-router-dom";
import {
  LuShoppingCart,
  LuLaptop,
  LuLogIn,
  LuLogOut,
  LuUserPlus,
} from "react-icons/lu";

const Navbar = () => {
  const user = true;
  const isAdmin = true;

  return (
    <header className="bg-gray-900 fixed w-full">
      <nav className="container mx-auto flex items-center justify-between flex-wrap p-6">
        <Link to="/" className="text-3xl font-bold text-emerald-400">
          E-Commerce
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-300 hover:text-emerald-400"
            >
              <LuShoppingCart size={20} />
              <span className="inline">Cart</span>
              <span className="absolute -top-1 -left-1 bg-emerald-400 text-white rounded-full px-1 text-xs">
                0
              </span>
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center gap-1 transition duration-300 ease-in-out"
            >
              <LuLaptop size={20} />
              <span>Dashboard</span>
            </Link>
          )}
          {user ? (
            <button
              onClick={() => alert("Logout")}
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center gap-1 transition duration-300 ease-in-out"
            >
              <LuLogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md flex items-center gap-1 transition duration-300 ease-in-out"
              >
                <LuLogIn size={20} />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center gap-1 transition duration-300 ease-in-out"
              >
                <LuUserPlus size={20} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
