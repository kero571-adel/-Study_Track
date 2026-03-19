import { useSelector, useDispatch } from "react-redux";
import CourseCard from "../components/CourseCard";
import { updateCourseProgress, deleteCourse } from "../redux/store";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "@mui/material";
// Progress page - displays all courses with progress tracking and animations
export default function Progress() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.items);

  const handleUpdateProgress = (courseId, watchedVideos) => {
    dispatch(
      updateCourseProgress({
        id: courseId,
        watchedVideos: parseInt(watchedVideos),
      })
    );
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(courseId));
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
            animate="visible"
          >
            {courses.map((course, index) => (
              <motion.div key={course.id} variants={itemVariants}>
                <CourseCard
                  course={course}
                  onUpdate={handleUpdateProgress}
                  onDelete={handleDeleteCourse}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </Container>
  );
}
