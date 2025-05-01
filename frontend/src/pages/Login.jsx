import { LuLoader } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import FormInput from "../components/FormInput";

const Login = () => {
  const { login, loading } = useUserStore();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
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
