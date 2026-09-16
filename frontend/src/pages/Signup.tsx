import React from "react";
import axios, { AxiosError } from "axios";
import { AUTH_API } from "../config/api";
import { Link, useNavigate } from "react-router-dom";
import type { LoginForm } from "../types/user.types";

const Signup = ({ setUser }: LoginForm) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${AUTH_API}/signup`, form, {
        headers: { "Content-Type": "application/json" },
      });
      alert(response.data.message || "Registration successful!");
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
      <form
        action="#"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Enter Name"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Email"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="border border-gray-300 rounded-md p-2 mb-6 w-full"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <p className="mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600 disabled:bg-gray-400"
          disabled={!form.email || !form.password || !form.name}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
