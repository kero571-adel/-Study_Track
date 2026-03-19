import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingFallback } from "./utils/performanceOptimizer";

// Lazy load pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const Progress = lazy(() => import("./pages/Progress"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Games = lazy(() => import("./pages/Games"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Main App component - routes all pages with authentication
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <Suspense
              fallback={
                <LoadingFallback message="جاري تحميل صفحة التسجيل..." />
              }
            >
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense
              fallback={
                <LoadingFallback message="جاري تحميل صفحة التسجيل..." />
              }
            >
              <Register />
            </Suspense>
          }
        />

        {/* Protected Routes - requires authentication */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                  <Suspense
                    fallback={
                      <LoadingFallback message="جاري تحميل المحتوى..." />
                    }
                  >
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/add-course" element={<AddCourse />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Suspense>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
