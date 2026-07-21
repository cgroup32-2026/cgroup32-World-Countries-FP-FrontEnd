import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const passwordIsValid = Object.values(passwordRequirements).every(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!passwordIsValid) {
      setError("Please meet all password requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const result = await authApi.register({
        username: formData.username,
        fullName: formData.fullName || null,
        email: formData.email,
        password: formData.password,
      });

      login(result);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-navy-950 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-navy-700 bg-navy-900 p-8 shadow-xl"
      >
        <div className="mb-8">
          <h1 className="font-heading text-3xl text-amber-400">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-amber-50/60">
            Start exploring the world and tracking your journey.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded border border-red-700 bg-red-900/40 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm text-amber-50"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm text-amber-50"
            >
              Full Name <span className="text-amber-50/40">(optional)</span>
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-amber-50">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm text-amber-50"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            />

            <div className="mt-2 rounded-md bg-navy-800 px-3 py-2 text-xs">
              <p className="mb-1 text-amber-50/60">Password requirements:</p>

              <p
                className={
                  passwordRequirements.minLength
                    ? "text-green-400"
                    : "text-amber-50/50"
                }
              >
                {passwordRequirements.minLength ? "✓" : "○"} At least 8
                characters
              </p>

              <p
                className={
                  passwordRequirements.uppercase
                    ? "text-green-400"
                    : "text-amber-50/50"
                }
              >
                {passwordRequirements.uppercase ? "✓" : "○"} One uppercase
                letter
              </p>

              <p
                className={
                  passwordRequirements.number
                    ? "text-green-400"
                    : "text-amber-50/50"
                }
              >
                {passwordRequirements.number ? "✓" : "○"} One number
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm text-amber-50"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 focus:border-amber-400 focus:outline-none"
            />

            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="mt-2 text-xs text-red-300">
                  Passwords do not match.
                </p>
              )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded bg-amber-500 py-2.5 font-semibold text-navy-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="mt-6 text-center text-sm text-amber-50/60">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
