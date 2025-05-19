import { useEffect, useState } from "react";

const SView = () => {
  const [subAgents, setSubAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubAgents = async () => {
    try {
      const token = localStorage.getItem("token"); // Replace with your actual key
  console.log(token)
      const res = await fetch("http://localhost:8080/v1/get-sub-agent", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch sub-agents");
      }

      const data = await res.json();
      setSubAgents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubAgents();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sub-Agents</h1>
      {subAgents.length === 0 ? (
        <p className="text-gray-600">No sub-agents found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subAgents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
            >
              <h2 className="text-lg font-semibold">{agent.name || "No Name"}</h2>
              <p className="text-gray-500">ID: {agent._id}</p>
              <p className="text-gray-500">User ID: {agent.userId}</p>
              {/* Add more fields if needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SView;
