import { Link } from "react-router-dom";
import { LuUser, LuMail, LuLock } from "react-icons/lu";
import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form className="bg-gray-900 shadow p-10 rounded-lg flex flex-col gap-4 sm:w-96">
        <h1 className="text-4xl font-extrabold text-emerald-400 text-center">
          Signup
        </h1>
        <div>
          <label htmlFor="name" className="text-gray-300 font-medium">
            Name
          </label>
          <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
            <LuUser className="text-gray-300" size={20} />
            <input
              type="text"
              id="name"
              className="bg-gray-700 text-gray-300 w-full outline-none"
              placeholder="Enter your name"
              maxLength={20}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>
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
              minLength={6}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-gray-300 font-medium"
          >
            Confirm Password
          </label>
          <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
            <LuLock className="text-gray-300" size={20} />
            <input
              type="password"
              id="confirmPassword"
              className="bg-gray-700 text-gray-300 w-full outline-none"
              placeholder="Confirm your password"
              minLength={6}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold p-2 rounded-lg w-full mt-4 transition duration-150 ease-in-out"
        >
          Signup
        </button>
        <p className="text-gray-300 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Signup;
