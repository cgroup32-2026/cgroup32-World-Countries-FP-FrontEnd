import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authApi.login({ username, password });
      login(result);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-navy-900 border border-navy-700 rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-heading text-amber-400 mb-6">
          Welcome Back
        </h1>

        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-200 text-sm rounded px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <label className="block text-amber-50 text-sm mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 rounded bg-navy-800 border border-navy-600 text-amber-50 focus:outline-none focus:border-amber-400"
        />

        <label className="block text-amber-50 text-sm mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-3 py-2 rounded bg-navy-800 border border-navy-600 text-amber-50 focus:outline-none focus:border-amber-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-navy-950 font-semibold py-2 rounded transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}
