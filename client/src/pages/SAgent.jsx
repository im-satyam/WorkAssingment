import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddSubAgent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("http://localhost:8080/v1/add-sub-agent", formData, config);

      if (response.data.success) {
        toast.success(response.data.message || "Agent added successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setFormData({
          name: "",
          email: "",
          countryCode: "+91",
          phone: "",
          password: "",
        });
      } else {
        toast.error(response.data.message || "Failed to add agent.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Agent</h2>

        <input
          type="text"
          name="name"
          placeholder="Agent Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <div className="flex gap-2 mb-4">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="w-1/3 px-2 py-2 border rounded"
            required
          >
            <option value="+91">🇮🇳 +91 (India)</option>
            <option value="+1">🇺🇸 +1 (USA)</option>
            <option value="+44">🇬🇧 +44 (UK)</option>
            <option value="+61">🇦🇺 +61 (Australia)</option>
            <option value="+81">🇯🇵 +81 (Japan)</option>
          </select>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-2/3 px-4 py-2 border rounded"
            required
          />
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Add Agent
        </button>
      </form>
    </div>
  );
}
