import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "../components/TaskItem";
import { addTask, toggleTaskComplete, deleteTask } from "../redux/store";
import { motion } from "framer-motion";
import { Container } from "@mui/material";
// Tasks page - study planner for managing tasks and deadlines with animations
export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
  });
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, today, overdue, completed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Task title is required");
      return;
    }
    if (!formData.date) {
      setError("Due date is required");
      return;
    }

    dispatch(
      addTask({
        title: formData.title.trim(),
        date: formData.date,
      })
    );

    setFormData({ title: "", date: "" });
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskComplete(taskId));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(taskId));
    }
  };

  // Filter tasks based on selected filter
  const getFilteredTasks = () => {
    const today = new Date().toDateString();

    switch (filter) {
      case "today":
        return tasks.filter((t) => new Date(t.date).toDateString() === today);
      case "overdue":
        return tasks.filter(
          (t) => !t.completed && new Date(t.date) < new Date()
        );
      case "completed":
        return tasks.filter((t) => t.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedCount = tasks.filter((t) => t.completed).length;
  const overdueCount = tasks.filter(
    (t) => !t.completed && new Date(t.date) < new Date()
  ).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

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
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="form-input"
              />
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Task
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
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All ({tasks.length})
            </motion.button>
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
            >
              {filteredTasks.map((task) => (
                <motion.div key={task.id} variants={itemVariants}>
                  <TaskItem
                    task={task}
                    onToggle={handleToggleComplete}
                    onDelete={handleDeleteTask}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </div>
  );
}
