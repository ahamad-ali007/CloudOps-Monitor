import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    api.get("/")
      .then((response) => {
        setBackendData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold text-cyan-400">
        CloudOps Monitor
      </h1>

      <div className="mt-10 rounded-xl bg-slate-800 p-8 shadow-lg w-[500px]">
        <h2 className="text-2xl font-semibold mb-4">
          Backend Status
        </h2>

        {backendData ? (
          <>
            <p className="text-green-400 text-xl">
              🟢 Connected
            </p>

            <p className="mt-4">
              {backendData.message}
            </p>

            <p>
              Status: {backendData.status}
            </p>
          </>
        ) : (
          <p className="text-red-400">
            Connecting...
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;