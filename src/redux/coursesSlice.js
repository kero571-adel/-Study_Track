// redux/coursesSlice.js (أو داخل store.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getUserCourses, addCourse as fbAddCourse, 
  updateCourse as fbUpdateCourse, deleteCourse as fbDeleteCourse 
} from './firebaseHelpers'; // عدل المسار حسب مشروعك
import { useAuth } from '../context/AuthContext'; // استورد useAuth من مسارك

// 1. جلب الكورسات
export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (userId) => await getUserCourses(userId)
);

// 2. إضافة كورس
export const addCourseAsync = createAsyncThunk(
  'courses/addCourseAsync',
  async ({ userId, courseData }) => {
    const docId = await fbAddCourse(userId, courseData);
    // إرجاع نفس البيانات مع الـ ID و watchedVideos الافتراضي
    return { id: docId, ...courseData, watchedVideos: 0 };
  }
);

// 3. تحديث التقدم
export const updateProgressAsync = createAsyncThunk(
  'courses/updateProgressAsync',
  async ({ userId, courseId, watchedVideos }) => {
    await fbUpdateCourse(userId, courseId, { watchedVideos });
    return { id: courseId, watchedVideos };
  }
);

// 4. حذف كورس
export const deleteCourseAsync = createAsyncThunk(
  'courses/deleteCourseAsync',
  async ({ userId, courseId }) => {
    await fbDeleteCourse(userId, courseId);
    return courseId;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {}, // احذف الـ sync reducers القديمة أو اتركها كـ fallback
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProgressAsync.fulfilled, (state, action) => {
        const course = state.items.find(c => c.id === action.payload.id);
        if (course) course.watchedVideos = action.payload.watchedVideos;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c.id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  }
});

export default coursesSlice.reducer;