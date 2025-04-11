import { LuMail, LuLock, LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";

const Login = () => {
  const { login, loading } = useUserStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form
        className="bg-gray-900 shadow p-10 rounded-lg flex flex-col gap-4 sm:w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-extrabold text-emerald-400 text-center">
          Login
        </h1>
        <div>
          <label htmlFor="email" className="text-gray-300 font-medium">
            Email
          </label>
          <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
            <LuMail className="text-gray-300" size={20} />
            <input
              type="email"
              id="email"
              className="bg-gray-700 text-gray-300 w-full outline-none"
              placeholder="Enter your email"
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="text-gray-300 font-medium">
            Password
          </label>
          <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
            <LuLock className="text-gray-300" size={20} />
            <input
              type="password"
              id="password"
              className="bg-gray-700 text-gray-300 w-full outline-none"
              placeholder="Enter your password"
              required
              minLength={6}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2 rounded-lg w-full mt-4 transition duration-150 ease-in-out"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <LuLoader className="animate-spin" size={20} />
              Loading...
            </span>
          ) : (
            "Login"
          )}
        </button>
        <p className="text-gray-300 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
