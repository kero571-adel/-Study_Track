import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Get additional user data from Firestore
          const userDocRef = doc(db, "users", authUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          const userData = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "",
            photoURL: authUser.photoURL || "",
            ...userDocSnap.data(),
          };

          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "",
            photoURL: authUser.photoURL || "",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Register user with email and password
  const register = async (userData) => {
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );

      const authUser = userCredential.user;

      // Update display name
      await updateProfile(authUser, {
        displayName: userData.name,
      });

      // Save additional user data to Firestore
      const userDocRef = doc(db, "users", authUser.uid);
      await setDoc(userDocRef, {
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        courses: [],
        tasks: [],
        progress: 0,
      });

      // Update local user state
      const newUser = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: userData.name,
        name: userData.name,
        createdAt: new Date().toISOString(),
        courses: [],
        tasks: [],
        progress: 0,
      };

      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Login user with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const authUser = userCredential.user;

      // Get user data from Firestore
      const userDocRef = doc(db, "users", authUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      const userData = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || "",
        ...userDocSnap.data(),
      };

      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updatedData) => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      // Update in Firebase Auth
      if (updatedData.name) {
        await updateProfile(auth.currentUser, {
          displayName: updatedData.name,
        });
      }

      // Update in Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          ...updatedData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      // Update local state
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedData,
        updatedAt: new Date().toISOString(),
      }));

      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
