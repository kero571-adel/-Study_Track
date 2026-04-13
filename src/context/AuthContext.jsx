// import React, { createContext, useState, useContext, useEffect } from "react";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { 
//   doc, 
//   setDoc, 
//   getDoc, 
//   collection, 
//   addDoc 
// } from "firebase/firestore";
// import { auth, db } from "../firebase";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const migrateLocalStorageToFirebase = async (userId) => {
//     try {
//       // 1️⃣ Check if migration already completed for this user
//       const migrationFlag = localStorage.getItem(`migration_done_${userId}`);
//       if (migrationFlag === 'true') {
//         console.log("ℹ️ Migration already done for user:", userId);
//         return { success: true, courses: 0, tasks: 0 };
//       }

//       console.log("🔄 Starting migration from localStorage to Firebase...");
      
//       // 2️⃣ Get data from localStorage
//       const localCourses = JSON.parse(localStorage.getItem("courses")) || [];
//       const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
//       // 3️⃣ If no data, mark as done and exit
//       if (localCourses.length === 0 && localTasks.length === 0) {
//         localStorage.setItem(`migration_done_${userId}`, 'true');
//         console.log("ℹ️ No localStorage data to migrate");
//         return { success: true, courses: 0, tasks: 0 };
//       }
      
//       let migratedCourses = 0;
//       let migratedTasks = 0;
      
//       // 4️⃣ Migrate courses
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
      
//       // 5️⃣ Migrate tasks
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
      
//       // 6️⃣ On success: clean localStorage and set migration flag
//       if (migratedCourses > 0 || migratedTasks > 0) {
//         console.log(`✅ Migration successful! Moved ${migratedCourses} courses and ${migratedTasks} tasks`);
//         localStorage.removeItem("courses");
//         localStorage.removeItem("tasks");
//         localStorage.setItem(`migration_done_${userId}`, 'true');
//       }
      
//       return { 
//         success: true, 
//         courses: migratedCourses, 
//         tasks: migratedTasks 
//       };
      
//     } catch (error) {
//       console.error("❌ Migration error:", error);
//       return { success: false, error: error.message };
//     }
//   };

//   // Listen for auth state changes
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
//       if (authUser) {
//         try {
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

//       // Save user data to Firestore (without courses/tasks arrays)
//       const userDocRef = doc(db, "users", authUser.uid);
//       await setDoc(userDocRef, {
//         name: userData.name,
//         email: userData.email,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         progress: 0,
//       });

//       // ✅ Run migration after account creation (for users who tried the app before)
//       const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);
      
//       const newUser = {
//         uid: authUser.uid,
//         email: authUser.email,
//         displayName: userData.name,
//         name: userData.name,
//         createdAt: new Date().toISOString(),
//         progress: 0,
//       };

//       if (migrationResult.success && (migrationResult.courses > 0 || migrationResult.tasks > 0)) {
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
//   const login = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const authUser = userCredential.user;

//       const userDocRef = doc(db, "users", authUser.uid);
//       const userDocSnap = await getDoc(userDocRef);

//       const userData = {
//         uid: authUser.uid,
//         email: authUser.email,
//         displayName: authUser.displayName || "",
//         ...userDocSnap.data(),
//       };

//       // ✅ Run migration after successful login
//       const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);
      
//       if (migrationResult.success && (migrationResult.courses > 0 || migrationResult.tasks > 0)) {
//         console.log(`🎉 Welcome back! Migrated ${migrationResult.courses} courses and ${migrationResult.tasks} tasks`);
//         userData.migratedData = migrationResult;
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

//       if (updatedData.name) {
//         await updateProfile(auth.currentUser, {
//           displayName: updatedData.name,
//         });
//       }

//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       await setDoc(
//         userDocRef,
//         {
//           ...updatedData,
//           updatedAt: new Date().toISOString(),
//         },
//         { merge: true }
//       );

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
// context/AuthContext.jsx - نسخة مؤمنة
import React, { createContext, useState, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  // ✅ لا تستورد أو تخزن التوكنز يدويًا
} from "firebase/auth";
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc 
} from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // 🔐 دالة النقل الآمنة: لا تخزن أي بيانات حساسة
  // ========================================
  const migrateLocalStorageToFirebase = async (userId) => {
    try {
      // ✅ 1. التحقق من علم النقل (غير حساس - مجرد true/false)
      const MIGRATION_KEY = `migration_done_${userId}`;
      const migrationFlag = localStorage.getItem(MIGRATION_KEY);
      
      if (migrationFlag === 'true') {
        return { success: true, courses: 0, tasks: 0 };
      }

      // ✅ 2. قراءة البيانات العامة فقط (لا كلمات مرور ولا توكنز!)
      // ⚠️ نفترض أن المستخدم كان يخزن فقط: {title, link, totalVideos, watchedVideos}
      const LOCAL_COURSES_KEY = "courses";
      const LOCAL_TASKS_KEY = "tasks";
      
      const localCourses = JSON.parse(localStorage.getItem(LOCAL_COURSES_KEY) || "[]");
      const localTasks = JSON.parse(localStorage.getItem(LOCAL_TASKS_KEY) || "[]");
      
      // ✅ 3. إذا لا توجد بيانات، نضع العلم ونخرج
      if (localCourses.length === 0 && localTasks.length === 0) {
        localStorage.setItem(MIGRATION_KEY, 'true');
        return { success: true, courses: 0, tasks: 0 };
      }
      
      let migratedCourses = 0;
      let migratedTasks = 0;
      
      // ✅ 4. نقل الكورسات (بيانات عامة فقط)
      for (const course of localCourses) {
        try {
          // ⚠️ تأكد أن course لا يحتوي على بيانات حساسة قبل النقل
          const safeCourseData = {
            title: String(course.title || "").slice(0, 200), // ✅ تطهير وطول أقصى
            link: course.link ? String(course.link).slice(0, 500) : null,
            totalVideos: Math.max(0, Math.min(10000, Number(course.totalVideos) || 0)), // ✅ تحقق من الأرقام
            watchedVideos: Math.max(0, Math.min(10000, Number(course.watchedVideos) || 0)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // ❌ لا تنقل أبدًا: password, token, email, phone, etc.
          };
          
          const coursesRef = collection(db, "users", userId, "courses");
          await addDoc(coursesRef, safeCourseData);
          migratedCourses++;
        } catch (err) {
          console.error("❌ Failed to migrate course:", err);
          // ✅ استمر في النقل حتى لو فشل عنصر واحد
        }
      }
      
      // ✅ 5. نقل المهام (بيانات عامة فقط)
      for (const task of localTasks) {
        try {
          const safeTaskData = {
            title: String(task.title || "").slice(0, 200),
            date: task.date ? String(task.date).slice(0, 50) : null,
            completed: Boolean(task.completed) || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // ❌ لا تنقل أبدًا: userId, token, sensitive notes, etc.
          };
          
          const tasksRef = collection(db, "users", userId, "tasks");
          await addDoc(tasksRef, safeTaskData);
          migratedTasks++;
        } catch (err) {
          console.error("❌ Failed to migrate task:", err);
        }
      }
      
      // ✅ 6. بعد النجاح: امسح البيانات من localStorage + ضع علم النقل
      if (migratedCourses > 0 || migratedTasks > 0) {
        localStorage.removeItem(LOCAL_COURSES_KEY);
        localStorage.removeItem(LOCAL_TASKS_KEY);
        localStorage.setItem(MIGRATION_KEY, 'true');
        console.log(`✅ Migration successful: ${migratedCourses} courses, ${migratedTasks} tasks`);
      }
      
      return { success: true, courses: migratedCourses, tasks: migratedTasks };
      
    } catch (error) {
      console.error("❌ Migration error:", error);
      return { success: false, error: error.message };
    }
  };

  // ✅ دالة تنظيف إضافية: لإزالة أي بيانات قديمة من localStorage
  const cleanupLocalStorage = (userId) => {
    try {
      // إزالة مفاتيح قد تكون حساسة إذا وُجدت
      const sensitiveKeys = [
        'password', 'token', 'authToken', 'refreshToken',
        'userPassword', 'secret', 'apiKey', 'privateKey'
      ];
      
      for (const key of Object.keys(localStorage)) {
        // إزالة أي مفتاح يحتوي على كلمات حساسة
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
          localStorage.removeItem(key);
          console.warn(`🗑️ Removed potentially sensitive key: ${key}`);
        }
        // إزالة بيانات المستخدم القديم إذا كانت لا تزال موجودة
        if (key === 'courses' || key === 'tasks') {
          localStorage.removeItem(key);
        }
      }
    } catch (e) {
      console.error("Cleanup error:", e);
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
          
          // ✅ تنظيف تلقائي بعد تسجيل الدخول الناجح
          cleanupLocalStorage(authUser.uid);
          
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

  // Register user
  const register = async (userData) => {
    try {
      // ⚠️ لا تخزن كلمة المرور في أي مكان غير المكالمة المباشرة
      const { password, ...safeUserData } = userData; // ✅ افصل كلمة المرور فورًا
      
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        safeUserData.email,
        password // ✅ تُستخدم مرة واحدة فقط ثم تُرمى
      );
      const authUser = userCredential.user;

      await updateProfile(authUser, {
        displayName: safeUserData.name,
      });

      // ✅ احفظ فقط البيانات العامة في Firestore
      const userDocRef = doc(db, "users", authUser.uid);
      await setDoc(userDocRef, {
        name: String(safeUserData.name || "").slice(0, 100),
        email: String(safeUserData.email || "").toLowerCase().slice(0, 255),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: 0,
        // ❌ لا تحفظ أبدًا: password, token, phone, address, etc.
      });

      // ✅ شغّل النقل الآمن
      const migrationResult = await migrateLocalStorageToFirebase(authUser.uid);
      
      const newUser = {
        uid: authUser.uid,
        email: authUser.email,
        displayName: safeUserData.name,
        name: safeUserData.name,
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

  // Login user - ✅ لا تخزن أي بيانات حساسة هنا
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        String(email || "").toLowerCase().trim(),
        password // ✅ تُستخدم للمصادقة فقط، لا تُخزن
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

  // Logout - ✅ نظّف أي بيانات محلية عند الخروج
  const logout = async () => {
    try {
      // تنظيف إضافي عند تسجيل الخروج
      if (auth.currentUser) {
        cleanupLocalStorage(auth.currentUser.uid);
      }
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  // Update user profile - ✅ تحقق من البيانات قبل الحفظ
  const updateUserProfile = async (updatedData) => {
    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      // ✅ افصل أي بيانات حساسة محتملة
      const { password, token, apiKey, ...safeUpdates } = updatedData;

      if (safeUpdates.name) {
        await updateProfile(auth.currentUser, {
          displayName: String(safeUpdates.name).slice(0, 100),
        });
      }

      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(
        userDocRef,
        {
          ...safeUpdates,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setUser((prevUser) => ({
        ...prevUser,
        ...safeUpdates,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};