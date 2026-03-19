import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/material";

// Sidebar component - main navigation for the study dashboard
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/add-course", label: "Add Course", icon: "➕" },
    { path: "/progress", label: "Progress", icon: "📈" },
    { path: "/tasks", label: "Tasks", icon: "✓" },
    { path: "/games", label: "Games", icon: "🎮" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile toggle button */}
      <Box sx={{ display: isMobileOpen ? "none" : "block" }}>
        <button
          className="sidebar-mobile-toggle"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          title="Toggle menu"
        >
          ☰
        </button>
      </Box>

      {/* Sidebar overlay for mobile */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1>📚 StudyTrack</h1>
          <button
            className="sidebar-close"
            onClick={() => setIsMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="sidebar-user-info">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user-details">
              <p className="user-name">{user.name || "User"}</p>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
        )}

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active" : ""}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
