import axios from "axios";
import { useEffect, useState } from "react";

const View = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {

        const response = await axios.get("http://localhost:8080/v1/get-agent", {}, {
          
        });

        setAgents(response.data); // Make sure backend sends array directly or access response.data.agents if wrapped
      } catch (error) {
        console.error("Failed to fetch agents:", error.response?.data || error.message);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">All Agents</h2>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {agents.map((agent) => (
          <div
            key={agent._id}
            className="bg-white p-4 rounded shadow border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-1">{agent.name}</h3>
            <p><span className="font-semibold">Email:</span> {agent.email}</p>
            <p><span className="font-semibold">Phone:</span> {agent.phone}</p>
            <p><span className="font-semibold">Work Assigned:</span> {agent.work}</p>
          </div>
        ))}
      </div>

      {agents.length === 0 && (
        <p className="text-center text-gray-600 mt-12">No agents found.</p>
      )}
    </div>
  );
};

export default View;
