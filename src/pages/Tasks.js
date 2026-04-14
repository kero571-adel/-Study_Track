// pages/Tasks.js
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageLoader from "../components/PageLoader";
import TaskItem from "../components/TaskItem";
import {
  fetchTasks,
  addTaskAsync,
  toggleTaskCompleteAsync,
  deleteTaskAsync,
} from "../redux/store";
import { motion } from "framer-motion";
import { Container, FormHelperText } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Tasks() {
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useAuth();
  const tasks = useSelector((state) => state.tasks.items);
  const tasksStatus = useSelector((state) => state.tasks.status);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState("");
  const [filter, setFilter] = useState("today");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // جلب المهام من Firebase
  useEffect(() => {
    if (user && tasksStatus === "idle") {
      dispatch(fetchTasks(user.uid));
    }
  }, [user, dispatch, tasksStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }
    if (!formData.startDate) {
      setError("Start date is required");
      return;
    }
    if (!formData.endDate) {
      setError("End date is required");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("End date must be after start date");
      return;
    }
    if (!user) {
      setError("Please login first");
      return;
    }

    setIsSubmitting(true);
    try {
      // ✅ إرسال التواريخ كنصوص "YYYY-MM-DD" لتجنب مشاكل الـ timezone
      const taskData = {
        title: formData.title.trim(),
        startDate: formData.startDate, // نص: "2024-04-10"
        endDate: formData.endDate, // نص: "2024-04-15"
        completed: false,
      };

      await dispatch(
        addTaskAsync({ userId: user.uid, data: taskData })
      ).unwrap();
      setFormData({ title: "", startDate: "", endDate: "" });
    } catch (err) {
      setError("Failed to add task: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || !user) return;
    try {
      await dispatch(
        toggleTaskCompleteAsync({
          userId: user.uid,
          taskId,
          completed: !task.completed,
        })
      ).unwrap();
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!user) return;
    if (window.confirm("Delete this task?")) {
      try {
        await dispatch(
          deleteTaskAsync({
            userId: user.uid,
            taskId,
          })
        ).unwrap();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  // ✅ دالة مساعدة: هل المهمة متأخرة؟ (تدعم القديم والجديد)
  // ✅ دالة لتحويل التاريخ النصي لـ Date للمقارنة
  const parseDate = (dateString) => {
    if (!dateString) return null;
    if (
      typeof dateString === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ) {
      const [year, month, day] = dateString.split("-");
      return new Date(year, month - 1, day); // شهر يبدأ من 0
    }
    return new Date(dateString);
  };

  // ✅ هل المهمة متأخرة؟ (تدعم القديم والجديد)
  const isTaskOverdue = (task) => {
    if (task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (task.endDate) return parseDate(task.endDate) < today;
    if (task.dueDate) return parseDate(task.dueDate) < today;
    if (task.date) return parseDate(task.date) < today; // fallback للقديم
    return false;
  };

  // ✅ هل المهمة ضمن اليوم؟
  const isTaskToday = (task) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (task.startDate && task.endDate) {
      const start = parseDate(task.startDate);
      const end = parseDate(task.endDate);
      return start && end && today >= start && today <= end;
    }
    const taskDate = parseDate(task.endDate || task.dueDate || task.date);
    return taskDate && taskDate.getTime() === today.getTime();
  };
  // ✅ فلتر المهام - محدث لدعم جميع تنسيقات التواريخ
 const getFilteredTasks = () => {
  return tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "all") return true;
    if (filter === "today") return !t.completed && isTaskToday(t);
    if (filter === "overdue") return isTaskOverdue(t);
    return true;
  });
};
  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((t) => t.completed).length;

  // ✅ إصلاح overdueCount ليدعم جميع تنسيقات التواريخ
const overdueCount = tasks.filter((t) => isTaskOverdue(t)).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  // عرض Loader
  if (authLoading || tasksStatus === "loading") {
    return <PageLoader />;
  }

  // توجيه المستخدم غير المسجّل
  if (!user) {
    return (
      <Container
        sx={{
          padding: { xs: "20px", md: "40px" },
          mt: { xs: "45px", md: "0px" },
        }}
      >
        <div className="auth-redirect">
          <h2>🔐 Please login to manage your tasks</h2>
          <a href="/login" className="btn btn-primary">
            Go to Login
          </a>
        </div>
      </Container>
    );
  }

  return (
    <div className="page tasks-page">
      <Container
        sx={{
          padding: { xs: "20px", md: "40px" },
          mt: { xs: "45px", md: "0px" },
        }}
      >
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>✓ Study Tasks</h1>
          <p className="page-subtitle">Plan and track your study tasks</p>
        </motion.div>

        {/* Task Statistics */}
        <motion.div
          className="task-stats"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <motion.div
            className="stat-badge"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="stat-number"
              key={tasks.length}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {tasks.length}
            </motion.span>
            <span className="stat-label">Total Tasks</span>
          </motion.div>
          <motion.div
            className="stat-badge"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="stat-number"
              key={completedCount}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {completedCount}
            </motion.span>
            <span className="stat-label">Completed</span>
          </motion.div>
          {overdueCount > 0 && (
            <motion.div
              className="stat-badge danger"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="stat-number"
                key={overdueCount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
              >
                {overdueCount}
              </motion.span>
              <span className="stat-label">Overdue</span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="tasks-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Add Task Form */}
          <div className="task-form-section">
            <h2>Add New Task</h2>
            {error && (
              <motion.div
                className="alert alert-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                ✕ {error}
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="task-form">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task title (e.g., Complete Chapter 5)"
                className="form-input"
              />

              {/* حقول التواريخ */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="End date"
                  min={formData.startDate}
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Task"}
              </motion.button>
            </form>
          </div>

          {/* Filter Buttons */}
          <motion.div
            className="task-filters"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <motion.button
              className={`filter-btn ${filter === "today" ? "active" : ""}`}
              onClick={() => setFilter("today")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Today
            </motion.button>
            {overdueCount > 0 && (
              <motion.button
                className={`filter-btn ${filter === "overdue" ? "active" : ""}`}
                onClick={() => setFilter("overdue")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Overdue ({overdueCount})
              </motion.button>
            )}
            <motion.button
              className={`filter-btn ${filter === "completed" ? "active" : ""}`}
              onClick={() => setFilter("completed")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Completed ({completedCount})
            </motion.button>
            <motion.button
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All ({tasks.length})
            </motion.button>
          </motion.div>

          {/* Tasks List */}
          {filteredTasks.length === 0 ? (
            <motion.div
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p>
                {filter === "all" &&
                  "📝 No tasks yet. Create one to get started!"}
                {filter === "today" &&
                  "📝 No tasks for today. Enjoy your break!"}
                {filter === "overdue" &&
                  "✓ No overdue tasks. Great job staying on track!"}
                {filter === "completed" && "📝 No completed tasks yet."}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="tasks-list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`${filter}-${tasks.length}`}
            >
              {filteredTasks.map((task) => {
                // ✅ حساب حالة التأخير لكل مهمة
                const taskIsOverdue = isTaskOverdue(task);

                return (
                  <motion.div
                    key={task.id}
                    variants={itemVariants}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TaskItem
                      task={task}
                      onToggle={handleToggleComplete}
                      onDelete={handleDeleteTask}
                      isOverdue={taskIsOverdue}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
