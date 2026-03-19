// Firebase helper functions
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "./firebase";

// ========== User Functions ==========

/**
 * Get user data from Firestore
 */
export const getUserData = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return userDocSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

/**
 * Update user data in Firestore
 */
export const updateUserData = async (userId, data) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
};

// ========== Course Functions ==========

/**
 * Add a course for a user
 */
export const addCourse = async (userId, courseData) => {
  try {
    const coursesRef = collection(db, "users", userId, "courses");
    const docRef = await addDoc(coursesRef, {
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

/**
 * Get all courses for a user
 */
export const getUserCourses = async (userId) => {
  try {
    const coursesRef = collection(db, "users", userId, "courses");
    const q = query(coursesRef);
    const querySnapshot = await getDocs(q);

    const courses = [];
    querySnapshot.forEach((doc) => {
      courses.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return courses;
  } catch (error) {
    console.error("Error getting user courses:", error);
    throw error;
  }
};

/**
 * Update a course
 */
export const updateCourse = async (userId, courseId, courseData) => {
  try {
    const courseDocRef = doc(db, "users", userId, "courses", courseId);
    await updateDoc(courseDocRef, {
      ...courseData,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

/**
 * Delete a course
 */
export const deleteCourse = async (userId, courseId) => {
  try {
    const courseDocRef = doc(db, "users", userId, "courses", courseId);
    await deleteDoc(courseDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// ========== Task Functions ==========

/**
 * Add a task for a user
 */
export const addTask = async (userId, taskData) => {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const docRef = await addDoc(tasksRef, {
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

/**
 * Get all tasks for a user
 */
export const getUserTasks = async (userId) => {
  try {
    const tasksRef = collection(db, "users", userId, "tasks");
    const q = query(tasksRef);
    const querySnapshot = await getDocs(q);

    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return tasks;
  } catch (error) {
    console.error("Error getting user tasks:", error);
    throw error;
  }
};

/**
 * Update a task
 */
export const updateTask = async (userId, taskId, taskData) => {
  try {
    const taskDocRef = doc(db, "users", userId, "tasks", taskId);
    await updateDoc(taskDocRef, {
      ...taskData,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

/**
 * Delete a task
 */
export const deleteTask = async (userId, taskId) => {
  try {
    const taskDocRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskDocRef);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

// ========== Progress Functions ==========

/**
 * Update user progress
 */
export const updateUserProgress = async (userId, progress) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      progress,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};

/**
 * Get user progress
 */
export const getUserProgress = async (userId) => {
  try {
    const userData = await getUserData(userId);
    return userData?.progress || 0;
  } catch (error) {
    console.error("Error getting user progress:", error);
    throw error;
  }
};
