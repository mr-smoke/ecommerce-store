import { Link } from "react-router-dom";
import {
  LuShoppingCart,
  LuLaptop,
  LuLogIn,
  LuLogOut,
  LuUserPlus,
  LuLoader,
} from "react-icons/lu";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import Button from "./Button";

const Navbar = () => {
  const { logout, user, loading } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user && user.role === "admin";

  return (
    <header className="bg-gray-900 shadow-lg fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between flex-wrap p-6">
        <Link to="/" className="text-3xl font-bold text-emerald-400">
          E-Commerce
        </Link>
        <nav className="flex items-center gap-4">
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
                {cart.length}
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
            <Button
              type="button"
              loading={loading}
              text="Logout"
              onClick={() => logout()}
              icon={LuLogOut}
              className="bg-gray-600 hover:bg-gray-700 font-normal"
            />
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
