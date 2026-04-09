// import React, { createContext, useState, useContext, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
// import { auth, db } from "../firebase";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
//       if (authUser) {
//         try {
//           // Get additional user data from Firestore
//           const userDocRef = doc(db, "users", authUser.uid);
//           const userDocSnap = await getDoc(userDocRef);
//           const userData = {
//             uid: authUser.uid,
//             email: authUser.email,
//             displayName: authUser.displayName || "",
//             photoURL: authUser.photoURL || "",
//             ...userDocSnap.data(),
//           };

//           setUser(userData);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//           setUser({
//             uid: authUser.uid,
//             email: authUser.email,
//             displayName: authUser.displayName || "",
//             photoURL: authUser.photoURL || "",
//           });
//         }
//       } else {
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Register user with email and password
//   const register = async (userData) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         userData.email,
//         userData.password
//       );
//       const authUser = userCredential.user;

//       await updateProfile(authUser, {
//         displayName: userData.name,
//       });

//       // Save user data to Firestore (بدون courses/tasks arrays)
//       const userDocRef = doc(db, "users", authUser.uid);
//       await setDoc(userDocRef, {
//         name: userData.name,
//         email: userData.email,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         progress: 0,
//       });

//       // ✅ حتى المستخدم الجديد ممكن يكون عنده بيانات في localStorage من تجربة سابقة
//       const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);

//       const newUser = {
//         uid: authUser.uid,
//         email: authUser.email,
//         displayName: userData.name,
//         name: userData.name,
//         createdAt: new Date().toISOString(),
//         progress: 0,
//       };

//       if (
//         migrationResult.success &&
//         (migrationResult.courses > 0 || migrationResult.tasks > 0)
//       ) {
//         newUser.migratedData = migrationResult;
//       }

//       setUser(newUser);
//       return newUser;
//     } catch (error) {
//       console.error("Registration error:", error);
//       throw error;
//     }
//   };

//   // Login user with email and password
//   // AuthContext.js - داخل دالة login

//   const login = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const authUser = userCredential.user;

//       // Get user data from Firestore
//       const userDocRef = doc(db, "users", authUser.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       const userData = {
//         uid: authUser.uid,
//         email: authUser.email,
//         displayName: authUser.displayName || "",
//         ...userDocSnap.data(),
//       };

//       // ✅ استدعي دالة النقل بعد نجاح الدخول
//       const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);

//       // لو فيه بيانات اتنقلت، اعلم المستخدم
//       if (
//         migrationResult.success &&
//         (migrationResult.courses > 0 || migrationResult.tasks > 0)
//       ) {
//         console.log(
//           `🎉 Welcome back! Migrated ${migrationResult.courses} courses and ${migrationResult.tasks} tasks`
//         );
//         userData.migratedData = migrationResult; // اختياري: لعرض رسالة للمستخدم
//       }

//       setUser(userData);
//       return userData;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   };

//   // Logout user
//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//       throw error;
//     }
//   };

//   // Update user profile
//   const updateUserProfile = async (updatedData) => {
//     try {
//       if (!auth.currentUser) {
//         throw new Error("No user logged in");
//       }

//       // Update in Firebase Auth
//       if (updatedData.name) {
//         await updateProfile(auth.currentUser, {
//           displayName: updatedData.name,
//         });
//       }

//       // Update in Firestore
//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       await setDoc(
//         userDocRef,
//         {
//           ...updatedData,
//           updatedAt: new Date().toISOString(),
//         },
//         { merge: true }
//       );

//       // Update local state
//       setUser((prevUser) => ({
//         ...prevUser,
//         ...updatedData,
//         updatedAt: new Date().toISOString(),
//       }));

//       return true;
//     } catch (error) {
//       console.error("Error updating user profile:", error);
//       throw error;
//     }
//   };
//   // AuthContext.js - أضف الدالة دي جوه الـ AuthProvider (قبل return)

//   /**
//    * دالة نقل البيانات من localStorage إلى Firebase
//    * تُنفذ مرة واحدة لكل مستخدم عند تسجيل الدخول
//    */
//   const migrateLocalStorageToFirebase = async (userId) => {
//     try {
//       console.log("🔄 Starting migration from localStorage to Firebase...");

//       // جلب البيانات من localStorage
//       const localCourses = JSON.parse(localStorage.getItem("courses")) || [];
//       const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//       // تحقق لو مفيش بيانات، اخرج فورًا
//       if (localCourses.length === 0 && localTasks.length === 0) {
//         console.log("ℹ️ No localStorage data to migrate");
//         return { success: true, courses: 0, tasks: 0 };
//       }

//       let migratedCourses = 0;
//       let migratedTasks = 0;

//       // ========== نقل الكورسات ==========
//       if (localCourses.length > 0) {
//         console.log(`📚 Found ${localCourses.length} courses in localStorage`);

//         for (const course of localCourses) {
//           try {
//             const coursesRef = collection(db, "users", userId, "courses");
//             await addDoc(coursesRef, {
//               title: course.title,
//               link: course.link || null,
//               totalVideos: course.totalVideos,
//               watchedVideos: course.watchedVideos || 0,
//               createdAt: course.createdAt || new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             });
//             migratedCourses++;
//           } catch (err) {
//             console.error("❌ Failed to migrate course:", course.title, err);
//           }
//         }
//       }

//       // ========== نقل التاسكات ==========
//       if (localTasks.length > 0) {
//         console.log(`✅ Found ${localTasks.length} tasks in localStorage`);

//         for (const task of localTasks) {
//           try {
//             const tasksRef = collection(db, "users", userId, "tasks");
//             await addDoc(tasksRef, {
//               title: task.title,
//               date: task.date,
//               completed: task.completed || false,
//               createdAt: task.createdAt || new Date().toISOString(),
//               updatedAt: new Date().toISOString(),
//             });
//             migratedTasks++;
//           } catch (err) {
//             console.error("❌ Failed to migrate task:", task.title, err);
//           }
//         }
//       }

//       // لو نجح النقل، امسح البيانات من localStorage عشان متتنقلش تاني
//       if (migratedCourses > 0 || migratedTasks > 0) {
//         console.log(
//           `✅ Migration successful! Moved ${migratedCourses} courses and ${migratedTasks} tasks`
//         );

//         // احذف البيانات من localStorage
//         localStorage.removeItem("courses");
//         localStorage.removeItem("tasks");

//         // اختياري: اعلم المستخدم بالنقل عبر flag في الـ user object
//         return {
//           success: true,
//           courses: migratedCourses,
//           tasks: migratedTasks,
//         };
//       }

//       return { success: true, courses: 0, tasks: 0 };
//     } catch (error) {
//       console.error("❌ Migration error:", error);
//       return { success: false, error: error.message };
//     }
//   };
//   // مكون بسيط لعرض رسالة الترحيب
//   function MigrationToast({ courses, tasks, onClose }) {
//     if (courses === 0 && tasks === 0) return null;

//     return (
//       <div
//         style={{
//           position: "fixed",
//           top: "20px",
//           right: "20px",
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           color: "white",
//           padding: "15px 25px",
//           borderRadius: "12px",
//           boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
//           zIndex: 9999,
//           maxWidth: "350px",
//         }}
//       >
//         <h4 style={{ margin: "0 0 8px 0", fontSize: "16px" }}>
//           🎉 Welcome Back!
//         </h4>
//         <p style={{ margin: "0 0 12px 0", fontSize: "14px", opacity: 0.9 }}>
//           We migrated your data to the cloud:
//         </p>
//         <div style={{ display: "flex", gap: "20px", marginBottom: "12px" }}>
//           <div>
//             <strong style={{ fontSize: "20px" }}>{courses}</strong>
//             <span style={{ fontSize: "12px", opacity: 0.8 }}> Courses</span>
//           </div>
//           <div>
//             <strong style={{ fontSize: "20px" }}>{tasks}</strong>
//             <span style={{ fontSize: "12px", opacity: 0.8 }}> Tasks</span>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           style={{
//             background: "white",
//             color: "#667eea",
//             border: "none",
//             padding: "6px 16px",
//             borderRadius: "6px",
//             cursor: "pointer",
//             fontWeight: "bold",
//             fontSize: "13px",
//           }}
//         >
//           Got it!
//         </button>
//       </div>
//     );
//   }
//   const value = {
//     user,
//     loading,
//     register,
//     login,
//     logout,
//     updateUserProfile,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
// context/AuthContext.jsx
// context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc 
} from "firebase/firestore";
import { auth, db } from "../firebase";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // ✅ Migration Function: localStorage → Firebase
  // ✅ Placed BEFORE login/register to avoid hoisting issues
  // ========================================
  const migrateLocalStorageToFirebase = async (userId) => {
    try {
      // 1️⃣ Check if migration already completed for this user
      const migrationFlag = localStorage.getItem(`migration_done_${userId}`);
      if (migrationFlag === 'true') {
        console.log("ℹ️ Migration already done for user:", userId);
        return { success: true, courses: 0, tasks: 0 };
      }

      console.log("🔄 Starting migration from localStorage to Firebase...");
      
      // 2️⃣ Get data from localStorage
      const localCourses = JSON.parse(localStorage.getItem("courses")) || [];
      const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
      // 3️⃣ If no data, mark as done and exit
      if (localCourses.length === 0 && localTasks.length === 0) {
        localStorage.setItem(`migration_done_${userId}`, 'true');
        console.log("ℹ️ No localStorage data to migrate");
        return { success: true, courses: 0, tasks: 0 };
      }
      
      let migratedCourses = 0;
      let migratedTasks = 0;
      
      // 4️⃣ Migrate courses
      if (localCourses.length > 0) {
        console.log(`📚 Found ${localCourses.length} courses in localStorage`);
        
        for (const course of localCourses) {
          try {
            const coursesRef = collection(db, "users", userId, "courses");
            await addDoc(coursesRef, {
              title: course.title,
              link: course.link || null,
              totalVideos: course.totalVideos,
              watchedVideos: course.watchedVideos || 0,
              createdAt: course.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            migratedCourses++;
          } catch (err) {
            console.error("❌ Failed to migrate course:", course.title, err);
          }
        }
      }
      
      // 5️⃣ Migrate tasks
      if (localTasks.length > 0) {
        console.log(`✅ Found ${localTasks.length} tasks in localStorage`);
        
        for (const task of localTasks) {
          try {
            const tasksRef = collection(db, "users", userId, "tasks");
            await addDoc(tasksRef, {
              title: task.title,
              date: task.date,
              completed: task.completed || false,
              createdAt: task.createdAt || new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
            migratedTasks++;
          } catch (err) {
            console.error("❌ Failed to migrate task:", task.title, err);
          }
        }
      }
      
      // 6️⃣ On success: clean localStorage and set migration flag
      if (migratedCourses > 0 || migratedTasks > 0) {
        console.log(`✅ Migration successful! Moved ${migratedCourses} courses and ${migratedTasks} tasks`);
        localStorage.removeItem("courses");
        localStorage.removeItem("tasks");
        localStorage.setItem(`migration_done_${userId}`, 'true');
      }
      
      return { 
        success: true, 
        courses: migratedCourses, 
        tasks: migratedTasks 
      };
      
    } catch (error) {
      console.error("❌ Migration error:", error);
      return { success: false, error: error.message };
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const authUser = userCredential.user;

      await updateProfile(authUser, {
        displayName: userData.name,
      });

      // Save user data to Firestore (without courses/tasks arrays)
      const userDocRef = doc(db, "users", authUser.uid);
      await setDoc(userDocRef, {
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
      });

      // ✅ Run migration after account creation (for users who tried the app before)
      const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);
      
      const newUser = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: userData.name,
        name: userData.name,
        createdAt: new Date().toISOString(),
        progress: 0,
      };

      if (migrationResult.success && (migrationResult.courses > 0 || migrationResult.tasks > 0)) {
        newUser.migratedData = migrationResult;
      }

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

      const userDocRef = doc(db, "users", authUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      const userData = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: authUser.displayName || "",
        ...userDocSnap.data(),
      };

      // ✅ Run migration after successful login
      const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);
      
      if (migrationResult.success && (migrationResult.courses > 0 || migrationResult.tasks > 0)) {
        console.log(`🎉 Welcome back! Migrated ${migrationResult.courses} courses and ${migrationResult.tasks} tasks`);
        userData.migratedData = migrationResult;
      }

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

      if (updatedData.name) {
        await updateProfile(auth.currentUser, {
          displayName: updatedData.name,
        });
      }

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          ...updatedData,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

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