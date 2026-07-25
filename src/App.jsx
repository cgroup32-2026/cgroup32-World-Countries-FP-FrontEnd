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
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MyListsPage } from "./pages/MyListsPage";
import { QuizPage } from "./pages/QuizPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { CommunityPage } from "./pages/CommunityPage";
import { MySharesPage } from "./pages/MySharesPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminUsersPage } from "./pages/AdminUsersPage";
import { MyQuizHistoryPage } from "./pages/MyQuizHistoryPage";
import { AdminCountriesPage } from "./pages/AdminCountriesPage";
import { AdminLoginHistoryPage } from "./pages/AdminLoginHistoryPage";
import { MapPage } from "./pages/MapPage";
import { GeoGamePage } from "./pages/GeoGamePage";







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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/countries/:id" element={<CountryDetailPage />} />
            <Route path="/shares" element={<CommunityPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/game" element={<GeoGamePage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:id" element={<QuizPage />} />
            <Route
              path="/advanced-features"
              element={<Placeholder title="Advanced Features" />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-lists"
              element={
                <ProtectedRoute>
                  <MyListsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-shares"
              element={
                <ProtectedRoute>
                  <MySharesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-quiz-history"
              element={
                <ProtectedRoute>
                  <MyQuizHistoryPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsersPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/countries"
              element={
                <AdminRoute>
                  <AdminCountriesPage />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/login-history"
              element={
                <AdminRoute>
                  <AdminLoginHistoryPage />
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
