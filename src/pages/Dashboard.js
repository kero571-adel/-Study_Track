import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Dashboard page - displays study summary and overview with animations
export default function Dashboard() {
  const courses = useSelector((state) => state.courses.items);
  const tasks = useSelector((state) => state.tasks.items);

  // Calculate overall statistics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (c) => c.watchedVideos === c.totalVideos
  ).length;

  const totalVideos = courses.reduce((sum, c) => sum + c.totalVideos, 0);
  const watchedVideos = courses.reduce((sum, c) => sum + c.watchedVideos, 0);
  const overallProgress =
    totalVideos > 0 ? (watchedVideos / totalVideos) * 100 : 0;

  const todayTasks = tasks.filter((t) => {
    const taskDate = new Date(t.date).toDateString();
    const today = new Date().toDateString();
    return taskDate === today && !t.completed;
  }).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <>
      <Helmet>
        <title>Study Dashboard | Study Tracker</title>
        <meta
          name="description"
          content="Track your courses, tasks, and study progress all in one place."
        />
        <meta
          name="keywords"
          content="dashboard, study tracker, courses, progress"
        />
        <meta property="og:title" content="Study Dashboard | Study Tracker" />
        <meta
          property="og:description"
          content="Track your courses and study progress"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="page dashboard-page">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>📊 Welcome to StudyTrack</h1>
          <p className="page-subtitle">Your personal study dashboard</p>
        </motion.div>

        <motion.div
          className="dashboard-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Summary Cards */}
          <motion.div
            className="summary-card"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="summary-card-icon">📚</div>
            <div className="summary-card-content">
              <h3>Total Courses</h3>
              <motion.p
                className="summary-card-number"
                key={totalCourses}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {totalCourses}
              </motion.p>
              <p className="summary-card-detail">
                {completedCourses} completed
              </p>
            </div>
          </motion.div>

          <motion.div
            className="summary-card"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="summary-card-icon">📈</div>
            <div className="summary-card-content">
              <h3>Overall Progress</h3>
              <motion.p
                className="summary-card-number"
                key={Math.round(overallProgress)}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {Math.round(overallProgress)}%
              </motion.p>
              <p className="summary-card-detail">
                {watchedVideos}/{totalVideos} videos
              </p>
            </div>
          </motion.div>

          <motion.div
            className="summary-card"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="summary-card-icon">✓</div>
            <div className="summary-card-content">
              <h3>Today's Tasks</h3>
              <motion.p
                className="summary-card-number"
                key={todayTasks}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {todayTasks}
              </motion.p>
              <p className="summary-card-detail">Due today</p>
            </div>
          </motion.div>

          <motion.div
            className="summary-card"
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className="summary-card-icon">🔥</div>
            <div className="summary-card-content">
              <h3>Streak</h3>
              <p className="summary-card-number">Keep It Up!</p>
              <p className="summary-card-detail">Stay consistent</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="quick-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Quick Actions</h2>
          <motion.div
            className="actions-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {totalCourses === 0 && (
              <motion.div variants={itemVariants}>
                <Link to="/add-course" className="action-card primary">
                  <span className="action-icon">➕</span>
                  <span className="action-label">Add Your First Course</span>
                </Link>
              </motion.div>
            )}
            {totalCourses > 0 && (
              <>
                <motion.div variants={itemVariants}>
                  <Link to="/progress" className="action-card">
                    <span className="action-icon">📈</span>
                    <span className="action-label">View Progress</span>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Link to="/add-course" className="action-card">
                    <span className="action-icon">➕</span>
                    <span className="action-label">Add New Course</span>
                  </Link>
                </motion.div>
              </>
            )}
            <motion.div variants={itemVariants}>
              <Link to="/tasks" className="action-card">
                <span className="action-icon">✓</span>
                <span className="action-label">Manage Tasks</span>
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/games" className="action-card">
                <span className="action-icon">🎮</span>
                <span className="action-label">Take a Break</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          className="welcome-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>💡 Study Tips</h2>
          <motion.div
            className="tips-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="tip" variants={itemVariants}>
              <strong>Consistency is Key:</strong> Study a little bit every day
              rather than cramming.
            </motion.div>
            <motion.div className="tip" variants={itemVariants}>
              <strong>Track Progress:</strong> Keep your courses updated to stay
              motivated.
            </motion.div>
            <motion.div className="tip" variants={itemVariants}>
              <strong>Plan Your Tasks:</strong> Break down your study into
              manageable tasks.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
