import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, CircularProgress } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Study Tracker</title>
        <meta
          name="description"
          content="Login to your Study Tracker account to manage your courses and progress."
        />
        <meta name="keywords" content="login, study tracker, education" />
        <meta property="og:title" content="Login | Study Tracker" />
        <meta
          property="og:description"
          content="Login to your Study Tracker account"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">📚</div>
            <h1>StudyTrack</h1>
            <p>Your Personal Study Companion</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Welcome Back!</h2>
            <p className="auth-subtitle">
              Sign in to continue to your dashboard
            </p>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">
                Create one
              </Link>
            </p>
          </div>

          <div className="auth-info">
            <p className="info-title">Demo Credentials:</p>
            <p className="info-text">Email: demo@example.com</p>
            <p className="info-text">Password: demo123</p>
          </div>
        </div>
      </div>
    </>
  );
}
