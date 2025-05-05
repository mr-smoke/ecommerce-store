import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import FormContainer from "../components/forms/FormContainer";
import TextInput from "../components/forms/TextInput";
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
        <TextInput
          label="Name"
          id="name"
          icon="user"
          type="text"
          placeholder="Enter your name"
          maxLength={20}
          required
          onChange={handleChange}
        />
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
          minLength={6}
          onChange={handleChange}
        />
        <TextInput
          label="Confirm Password"
          id="confirmPassword"
          icon="password"
          type="password"
          placeholder="Confirm your password"
          required
          minLength={6}
          onChange={handleChange}
        />
        <Button type="submit" loading={loading} text="Signup" />
      </FormContainer>
    </main>
  );
};

export default Signup;
