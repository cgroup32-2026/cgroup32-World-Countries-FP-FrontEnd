import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoute } from "./components/AdminRoute";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { MagazineHomePage } from "./pages/MagazineHomePage";
import { CountriesPage } from "./pages/CountriesPage";
import { CountryDetailPage } from "./pages/CountryDetailPage";

function Placeholder({ title }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center text-amber-50">
      <p className="text-lg opacity-60">{title} — coming soon</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-navy-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/register"
              element={<Placeholder title="Register" />}
            />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:id" element={<CountryDetailPage />} />
            <Route path="/shares" element={<Placeholder title="Community" />} />
            <Route path="/quizzes" element={<Placeholder title="Quizzes" />} />
            <Route
              path="/quizzes/:id"
              element={<Placeholder title="Play Quiz" />}
            />
            <Route
              path="/advanced-features"
              element={<Placeholder title="Advanced Features" />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Placeholder title="My Profile" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-lists"
              element={
                <ProtectedRoute>
                  <Placeholder title="My Lists" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-shares"
              element={
                <ProtectedRoute>
                  <Placeholder title="My Shares" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-quiz-history"
              element={
                <ProtectedRoute>
                  <Placeholder title="My Quiz History" />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Placeholder title="Admin Dashboard" />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <Placeholder title="Admin Users" />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
