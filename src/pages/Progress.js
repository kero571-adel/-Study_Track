// pages/Progress.js
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseCard from "../components/CourseCard";
import PageLoader from "../components/PageLoader";
import { motion, AnimatePresence } from "framer-motion";
// ✅ استيراد الـ Async Thunks الجديدة
import {
  fetchCourses,
  updateCourseProgressAsync,
  deleteCourseAsync,
} from "../redux/store";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
// ✅ استيراد الهوك الخاص بالمصادقة
import { useAuth } from "../context/AuthContext";

export default function Progress() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useAuth(); // ✅ جلب المستخدم وحالة التحميل

  const courses = useSelector((state) => state.courses.items);
  const coursesStatus = useSelector((state) => state.courses.status); // ✅ حالة الجلب من Redux

  // ✅ جلب الكورسات من Firebase أول ما الصفحة تفتح والمستخدم مسجّل
  useEffect(() => {
    if (user && coursesStatus === "idle") {
      dispatch(fetchCourses(user.uid));
    }
  }, [user, dispatch, coursesStatus]);

  // ✅ دالة تحديث التقدم - الآن غير متزامنة وتتصل بـ Firebase
  const handleUpdateProgress = async (courseId, watchedVideos) => {
    if (!user) return;
    try {
      await dispatch(
        updateCourseProgressAsync({
          userId: user.uid, // ✅ ضروري لتحديد مسار المستخدم في Firestore
          courseId,
          watchedVideos: parseInt(watchedVideos),
        })
      ).unwrap(); // ✅ لالتقاط الأخطاء من Firebase
    } catch (err) {
      console.error("Failed to update progress:", err);
      // يمكنك إضافة setError هنا لعرض رسالة للمستخدم إذا أردت
    }
  };

  // ✅ دالة حذف الكورس - الآن غير متزامنة وتتصل بـ Firebase
  const handleDeleteCourse = async (courseId) => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await dispatch(
          deleteCourseAsync({
            userId: user.uid, // ✅ ضروري لتحديد مسار المستخدم في Firestore
            courseId,
          })
        ).unwrap();
      } catch (err) {
        console.error("Failed to delete course:", err);
      }
    }
  };

  // Calculate statistics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (c) => c.watchedVideos === c.totalVideos
  ).length;
  const totalVideos = courses.reduce((sum, c) => sum + c.totalVideos, 0);
  const watchedVideos = courses.reduce((sum, c) => sum + c.watchedVideos, 0);
  const overallProgress =
    totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  // ✅ عرض شاشة تحميل أثناء انتظار المصادقة أو جلب البيانات
  if (authLoading || coursesStatus === "loading") {
    return <PageLoader />;
  }

  // ✅ إذا لم يكن المستخدم مسجلاً، اعرض رسالة التوجيه
  if (!user) {
    return (
      <Container
        sx={{
          padding: { xs: "20px", md: "40px" },
          mt: { xs: "45px", md: "0px" },
        }}
      >
        <div className="auth-redirect">
          <h2>🔐 Please login to track your progress</h2>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        padding: { xs: "20px", md: "40px" },
        mt: { xs: "45px", md: "0px" },
      }}
    >
      <div className="page progress-page">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>📈 Your Progress</h1>
          <p className="page-subtitle">Track your learning journey</p>
        </motion.div>

        {/* Overall Statistics */}
        {totalCourses > 0 && (
          <motion.div
            className="progress-stats"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="stat-item" variants={itemVariants}>
              <span className="stat-label">Total Courses</span>
              <motion.span
                className="stat-value"
                key={totalCourses}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {totalCourses}
              </motion.span>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <span className="stat-label">Completed</span>
              <motion.span
                className="stat-value"
                key={completedCourses}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {completedCourses}
              </motion.span>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <span className="stat-label">Overall Progress</span>
              <motion.span
                className="stat-value"
                key={Math.round(overallProgress)}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {Math.round(overallProgress)}%
              </motion.span>
            </motion.div>
            <motion.div className="stat-item" variants={itemVariants}>
              <span className="stat-label">Videos Watched</span>
              <span className="stat-value">
                {watchedVideos}/{totalVideos}
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>📚 No courses yet</h2>
            <p>Start by adding a course to track your learning progress.</p>
            <Link to="/add-course" className="btn btn-primary">
              Add Your First Course
            </Link>
          </motion.div>
        ) : (
          <motion.div
          className="courses-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"  // ✅ يشتغل لما العنصر يدخل الشاشة
          viewport={{ once: true, amount: 0.2 }}  // ✅ يشتغل مرة واحدة + يظهر لما 20% من العنصر ظاهر
          key={`courses-grid-${courses.length}`}  // ✅ مفتاح إجباري لإعادة الأنيميشن
        >
          <AnimatePresence>
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                // ✅ الحل الأهم: إضافة الأنيميشن مباشرة بدل الاعتماد على الـ variants المورثة
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                layout  // ✅ لإعادة حساب الـ layout عند التغيير
              >
                <CourseCard
                  course={course}
                  onUpdate={handleUpdateProgress}
                  onDelete={handleDeleteCourse}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}
      </div>
    </Container>
  );
}
