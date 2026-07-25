import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  return (
    <nav className="bg-navy-900 text-amber-50 px-6 py-4 flex items-center justify-between shadow-lg">
      <Link
        to="/"
        className="text-xl font-heading tracking-wide text-amber-400"
      >
        World Countries
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/countries" className="hover:text-amber-400 transition">
          Countries
        </Link>
        <Link to="/quizzes" className="hover:text-amber-400 transition">
          Quizzes
        </Link>
        <Link to="/shares" className="hover:text-amber-400 transition">
          Community
        </Link>
        <Link to="/map" className="hover:text-amber-400 transition">
          Map
        </Link>
        <Link to="/game" className="hover:text-amber-400 transition">
          GeoGame
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/my-lists" className="hover:text-amber-400 transition">
              My Lists
            </Link>
            <Link to="/profile" className="hover:text-amber-400 transition">
              Profile
            </Link>
          </>
        )}
        {isAdmin && (
          <Link to="/admin" className="hover:text-amber-400 transition">
            Admin
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold px-4 py-1.5 rounded transition"
          >
            Logout ({user?.username})
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-amber-50 hover:text-amber-400 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold px-4 py-1.5 rounded transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
