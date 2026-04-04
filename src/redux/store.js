// redux/store.js
import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getUserCourses, addCourse as fbAddCourse, updateCourse, deleteCourse as fbDeleteCourse,
  getUserTasks, addTask as fbAddTask, updateTask, deleteTask as fbDeleteTask 
} from "../firebaseHelpers"; 

// ============ COURSES ASYNC THUNKS ============
export const fetchCourses = createAsyncThunk("courses/fetchAll", async (userId) => {
  return await getUserCourses(userId);
});

export const addCourseAsync = createAsyncThunk("courses/add", async ({ userId, data }) => {
  const id = await fbAddCourse(userId, data);
  return { id, ...data, watchedVideos: 0 };
});

export const updateCourseProgressAsync = createAsyncThunk("courses/updateProgress", async ({ userId, courseId, watchedVideos }) => {
  await updateCourse(userId, courseId, { watchedVideos });
  return { id: courseId, watchedVideos };
});

export const deleteCourseAsync = createAsyncThunk("courses/delete", async ({ userId, courseId }) => {
  await fbDeleteCourse(userId, courseId);
  return courseId;
});

// Courses Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState: { items: [], status: "idle", error: null },
  reducers: {}, // مش هنستخدم الـ sync reducers دي تاني
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => { state.items = action.payload; state.status = "succeeded"; })
      .addCase(addCourseAsync.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(updateCourseProgressAsync.fulfilled, (state, action) => {
        const course = state.items.find(c => c.id === action.payload.id);
        if (course) course.watchedVideos = action.payload.watchedVideos;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ============ TASKS ASYNC THUNKS ============
export const fetchTasks = createAsyncThunk("tasks/fetchAll", async (userId) => {
  return await getUserTasks(userId);
});

export const addTaskAsync = createAsyncThunk("tasks/add", async ({ userId, data }) => {
  const id = await fbAddTask(userId, data);
  return { id, ...data, completed: false };
});

export const toggleTaskCompleteAsync = createAsyncThunk("tasks/toggle", async ({ userId, taskId, completed }) => {
  await updateTask(userId, taskId, { completed });
  return { id: taskId, completed };
});

export const deleteTaskAsync = createAsyncThunk("tasks/delete", async ({ userId, taskId }) => {
  await fbDeleteTask(userId, taskId);
  return taskId;
});

// Tasks Slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => { state.items = action.payload; state.status = "succeeded"; })
      .addCase(addTaskAsync.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(toggleTaskCompleteAsync.fulfilled, (state, action) => {
        const task = state.items.find(t => t.id === action.payload.id);
        if (task) task.completed = action.payload.completed;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload);
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions (الأسامي الجديدة)
export { coursesSlice, tasksSlice };

export const store = configureStore({
  reducer: {
    courses: coursesSlice.reducer,
    tasks: tasksSlice.reducer,
  },
});