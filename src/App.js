// App.js
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react"; // ✅ أضفنا useState و useEffect
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./context/AuthContext"; // ✅ أضفنا useAuth
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoadingFallback } from "./utils/performanceOptimizer";
import { LanguageProvider } from "./context/LanguageContext";
// Lazy load pages for code splitting
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddCourse = lazy(() => import("./pages/AddCourse"));
const Progress = lazy(() => import("./pages/Progress"));
const Tasks = lazy(() => import("./pages/Tasks"));
const Games = lazy(() => import("./pages/Games"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// ========================================
// ✅ مكون عرض رسالة الترحيب بعد النقل
// ========================================
function MigrationToast({ courses, tasks, onClose }) {
  // لو مفيش حاجة اتنقلت، متعرضش الرسالة
  if (courses === 0 && tasks === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        padding: "15px 25px",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        zIndex: 9999,
        maxWidth: "350px",
        animation: "slideIn 0.3s ease-out",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      <h4
        style={{
          margin: "0 0 8px 0",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        🎉 Welcome Back!
      </h4>
      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: "14px",
          opacity: 0.9,
          lineHeight: "1.4",
        }}
      >
        We migrated your data to the cloud:
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "12px",
          padding: "8px 0",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <strong style={{ fontSize: "20px", display: "block" }}>
            {courses}
          </strong>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>Courses</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <strong style={{ fontSize: "20px", display: "block" }}>
            {tasks}
          </strong>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>Tasks</span>
        </div>
      </div>

      <button
        onClick={onClose}
        style={{
          background: "white",
          color: "#667eea",
          border: "none",
          padding: "6px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "13px",
          width: "100%",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        Got it! ✓
      </button>
    </div>
  );
}

// ========================================
// ✅ مكون رئيسي يحتوي على منطق العرض
// ========================================
function AppContent() {
  const { user } = useAuth(); // ✅ جلب بيانات المستخدم
  const [showMigration, setShowMigration] = useState(false);
  const [migrationData, setMigrationData] = useState({ courses: 0, tasks: 0 });

  // ✅ عرض الرسالة لما يكون فيه بيانات اتنقلت
  useEffect(() => {
    if (user?.migratedData) {
      setMigrationData({
        courses: user.migratedData.courses || 0,
        tasks: user.migratedData.tasks || 0,
      });
      setShowMigration(true);

      // إخفاء الرسالة تلقائيًا بعد 6 ثواني
      const timer = setTimeout(() => setShowMigration(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <>
      {/* ✅ عرض رسالة الترحيب لو فيه نقل بيانات */}
      {showMigration && (
        <MigrationToast
          courses={migrationData.courses}
          tasks={migrationData.tasks}
          onClose={() => setShowMigration(false)}
        />
      )}

      {/* باقي التطبيق */}

      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <Suspense
              fallback={<LoadingFallback message="جاري تحميل صفحة الدخول..." />}
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
    </>
  );
}

// ========================================
// ✅ المكون الرئيسي للتصدير
// ========================================
export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
