import { configureStore, createSlice } from "@reduxjs/toolkit";
// import { notificationSlice } from "./profile/notification";

// Courses Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: JSON.parse(localStorage.getItem("courses")) || [],
  },
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        id: Date.now(),
        ...action.payload,
        watchedVideos: 0,
      };
      state.items.push(newCourse);
      localStorage.setItem("courses", JSON.stringify(state.items));
    },
    updateCourseProgress: (state, action) => {
      const { id, watchedVideos } = action.payload;
      const course = state.items.find((c) => c.id === id);
      if (course) {
        course.watchedVideos = watchedVideos;
        localStorage.setItem("courses", JSON.stringify(state.items));
      }
    },
    deleteCourse: (state, action) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      localStorage.setItem("courses", JSON.stringify(state.items));
    },
  },
});

// Tasks Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        ...action.payload,
        completed: false,
      };
      state.items.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
    toggleTaskComplete: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.items));
      }
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.items));
    },
  },
});

export const { addCourse, updateCourseProgress, deleteCourse } =
  coursesSlice.actions;
export const { addTask, toggleTaskComplete, deleteTask } = tasksSlice.actions;

export const store = configureStore({
  reducer: {
    // notification: notificationSlice,
    courses: coursesSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});
