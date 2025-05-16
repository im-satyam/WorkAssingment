import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/v1/register", formData);
      

       if(response.data.success){
      navigate("/dashboard");
      const token = response.data.token;
      localStorage.setItem("token", token);
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
      });
       }
       else{
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
        });
       }
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600">
          Register
        </button>
        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
