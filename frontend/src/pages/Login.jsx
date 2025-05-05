import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import FormContainer from "../components/forms/FormContainer";
import TextInput from "../components/forms/TextInput";
import Button from "../components/Button";

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

  const footer = (
    <p className="text-gray-300">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-500">
        Signup
      </Link>
    </p>
  );

  return (
    <main className="flex items-center justify-center min-h-screen">
      <FormContainer title="Login" footer={footer} onSubmit={handleSubmit}>
        <TextInput
          label="Email"
          id="email"
          icon="email"
          type="email"
          placeholder="Enter your email"
          required
          onChange={handleChange}
        />
        <TextInput
          label="Password"
          id="password"
          icon="password"
          type="password"
          placeholder="Enter your password"
          required
          onChange={handleChange}
        />
        <Button type="submit" loading={loading} text="Login" />
      </FormContainer>
    </main>
  );
};

export default Login;
