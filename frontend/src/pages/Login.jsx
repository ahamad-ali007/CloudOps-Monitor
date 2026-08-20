import { useState } from "react";
import { login } from "../services/authService";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(username, password);
      onLogin();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
        "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            CloudOps Monitor
          </h1>

          <p className="text-gray-400 mt-2">
            Sign in to your monitoring dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700
                         text-white border border-slate-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-700
                         text-white border border-slate-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30
                            text-red-400 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600
                       hover:bg-blue-700 disabled:bg-blue-800
                       text-white font-semibold transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;