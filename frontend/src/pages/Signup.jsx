import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import FormContainer from "../components/FormContainer";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const Signup = () => {
  const { signup, loading } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const footer = (
    <p className="text-gray-300">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-500">
        Login
      </Link>
    </p>
  );

  return (
    <main className="flex items-center justify-center min-h-screen">
      <FormContainer title="Signup" footer={footer} onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          id="name"
          type="text"
          placeholder="Enter your name"
          onChange={handleChange}
          maxLength={20}
        />
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
          minLength={6}
        />
        <FormInput
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          onChange={handleChange}
          minLength={6}
        />
        <Button type="submit" loading={loading} text="Signup" />
      </FormContainer>
    </main>
  );
};

export default Signup;
