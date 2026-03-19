import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, CircularProgress } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { Stack, Box, Typography } from "@mui/material";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
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
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      // Handle Firebase error codes
      if (err.code === "auth/email-already-in-use") {
        setError(
          "Email already registered. Please login or use a different email."
        );
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Please use a stronger password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(err.message || "Registration failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Register | Study Tracker</title>
        <meta
          name="description"
          content="Create a Study Tracker account to start tracking your courses and progress."
        />
        <meta
          name="keywords"
          content="register, sign up, study tracker, education"
        />
        <meta property="og:title" content="Register | Study Tracker" />
        <meta
          property="og:description"
          content="Join Study Tracker and start your learning journey"
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

            <div className="auth-form-container">
              <form onSubmit={handleSubmit} className="auth-form">
                <h2>Create Account</h2>
                <p className="auth-subtitle">
                  Join thousands of learners tracking their progress
                </p>

                {error && <div className="alert alert-error">{error}</div>}

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <p className="form-hint">At least 6 characters</p>
                </div>

                <div className="form-group">
                  <InputLabel htmlFor="outlined-adornment-confirm-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    required
                    size="medium"
                    sx={{
                      border: "2px solid #d1d5db",
                      borderRadius: "0.5rem",
                      marginBottom: "1rem",
                      transition: "all 0.3s ease",
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showConfirmPassword
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
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
                      <CircularProgress size={20} /> Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="auth-footer">
                <p>
                  Already have an account?{" "}
                  <Link to="/login" className="auth-link">
                    Sign in
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
