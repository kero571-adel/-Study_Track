import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  CircularProgress,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

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

      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      // Handle Firebase error codes
      if (err.code === "auth/user-not-found") {
        setError(
          "User not found. Please check your email or create an account."
        );
      } else if (err.code === "auth/wrong-password") {
        setError("Invalid password. Please try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError(err.message || "Login failed. Please try again.");
      }
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
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: { xs: "center", md: "space-between" },
              gap: 2,
            }}
          >
            <div>
              <div className="auth-header">
                <Box
                  sx={{
                    fontSize: { xs: "3rem", md: "5.5rem", lg: "10rem" },
                    marginBottom: " 1rem",
                    display: "inline-block",
                    animation: "scaleIn 0.6s ease-out",
                  }}
                >
                  📚
                </Box>
                <Box
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2.5rem", lg: "5rem" },
                    fontWeight: "bold",
                  }}
                >
                  StudyTrack
                </Box>
                <Typography
                  sx={{ fontSize: { xs: "1rem", md: "1.5rem", lg: "2rem" } }}
                >
                  Your Personal Study Companion
                </Typography>
              </div>
            </div>
            <div className="auth-form-container">
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
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    required
                    size="medium"
                    sx={{
                      border: "2px solid #d1d5db",
                      borderRadius: "0.5rem",
                      transition: "all 0.3s ease",
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>

                <button
                  style={{ marginTop: "1rem" }}
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
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
}
