import React, { createContext, useState, useContext, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  // Register user
  const register = (userData) => {
    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (existingUsers.some((u) => u.email === userData.email)) {
      throw new Error("Email already registered");
    }

    // Store user data
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Auto login after registration
    const userToStore = { ...newUser };
    delete userToStore.password; // Don't store password in auth user
    setUser(userToStore);
    localStorage.setItem("authUser", JSON.stringify(userToStore));

    return userToStore;
  };

  // Login user
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u) => u.email === email);

    if (!foundUser) {
      throw new Error("User not found");
    }

    if (foundUser.password !== password) {
      throw new Error("Invalid password");
    }

    const userToStore = { ...foundUser };
    delete userToStore.password;
    setUser(userToStore);
    localStorage.setItem("authUser", JSON.stringify(userToStore));

    return userToStore;
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
