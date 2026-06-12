import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";

import "../../styles/global.css";

export default function Register() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("USER");

  const [form, setForm] = useState({
    fullName: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (accountType === "USER") {
        await axios.post("http://localhost:8080/user/register", {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "USER",
        });
      } else {
        await axios.post("http://localhost:8080/admin/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "ADMIN",
        });
      }

      navigate("/login");
    } catch (err) {
      setError("Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-navy-900 via-blue-900 to-navy-800 flex items-center justify-center px-4">

      {/* Decorative floating shapes */}
      <div className="absolute top-[-80px] left-[-80px] w-48 h-48 bg-blue-700 rounded-full opacity-20 animate-ping"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-48 h-48 bg-blue-600 rounded-full opacity-15 animate-pulse"></div>

      {/* Compact glass card */}
      <div className="relative z-10 bg-blue-900 bg-opacity-90 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col items-center animate-slideIn">

        {/* Header */}
        <h1 className="text-3xl font-bold text-white mb-1 animate-fadeIn">
          Create Account
        </h1>
        <p className="text-gray-300 text-center mb-6 text-sm animate-fadeIn delay-100">
          Register as a User or Admin
        </p>

        {/* Form */}
        <form onSubmit={handleRegister} className="w-full space-y-4">

          {/* Account Type */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Account Type</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="w-full rounded-lg px-3 py-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Name */}
          {accountType === "USER" ? (
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
              <div className="flex items-center bg-navy-800 rounded-lg border border-gray-600 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="fullName"
                  required
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Admin Name</label>
              <div className="flex items-center bg-navy-800 rounded-lg border border-gray-600 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Admin Name"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <div className="flex items-center bg-navy-800 rounded-lg border border-gray-600 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Phone */}
          {accountType === "USER" && (
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Phone</label>
              <div className="flex items-center bg-navy-800 rounded-lg border border-gray-600 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
                <FaPhone className="text-gray-400 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <div className="flex items-center bg-navy-800 rounded-lg border border-gray-600 px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 hover:scale-105 flex justify-center items-center ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer login link as button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-blue-400 font-semibold hover:text-white hover:!bg-blue-700 transition-all px-4 py-2 rounded-full text-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
}
