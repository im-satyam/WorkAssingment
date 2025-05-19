import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "agent") {
        navigate("/agentdashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/v1/login", formData);

      if (response.data.success) {
        const token = response.data.token;
        const user = response.data.user; // ✅ Correct variable name

        // Store token and role
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
        });

        // Redirect based on user role
        if (user.role === "agent") {
          navigate("/agentdashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Try again.";
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Login
        </button>

        <p className="text-center text-sm mt-4">
          New user?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
}
