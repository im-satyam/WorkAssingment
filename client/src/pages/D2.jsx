import axios from "axios";
import { User, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function D2() {
  const [file, setFile] = useState(null);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (selectedFile && allowedTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      alert("Only .csv and .xlsx files are allowed");
      e.target.value = "";
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:8080/v1/agent-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Success:", response.data);

      if (response.data.agents && Array.isArray(response.data.agents)) {
        setAgents(response.data.agents);
      }
    } catch (error) {
      console.error("Failed:", error.response?.data || error.message);
    }
  };

  const goToAddAgent = () => {
  navigate("/subagent");
};
  const goToAgent = () => {
  navigate("/viewsubagent");
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative p-6">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Upload File</h2>

        <input
          type="file"
          accept=".csv,.xlsx"
          onChange={handleFileChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {file && (
          <p className="text-sm text-gray-700 mb-4">
            Selected file: <strong>{file.name}</strong>
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 w-96">
        {agents.length > 0 && (
          <h3 className="text-xl font-semibold mb-4 text-center">Agents Assigned</h3>
        )}

        {agents.map(agent => (
          <div
            key={agent._id}
            className="bg-white rounded shadow p-4 mb-4 border border-gray-200"
          >
            <h4 className="text-lg font-bold">{agent.name}</h4>
            <p>Work Assigned: <span className="font-semibold">{agent.work}</span></p>
          </div>
        ))}
      </div>
       <button
        onClick={goToAgent}
        className="fixed bottom-25 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        title="View Agent"
      >
        <User size={24}/>
      </button>
      {/* Floating Add Agent Button */}
      <button
        onClick={goToAddAgent}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        title="Go to Add Agent"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
}
