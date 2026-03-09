import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// AddCourse page - allows users to add new courses to track with animations
export default function AddCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    totalVideos: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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

    // Validation
    if (!formData.title.trim()) {
      setError("Course title is required");
      return;
    }
    if (!formData.totalVideos || formData.totalVideos <= 0) {
      setError("Total videos must be a positive number");
      return;
    }

    // Submit form
    dispatch(
      addCourse({
        title: formData.title.trim(),
        link: formData.link.trim() || null,
        totalVideos: parseInt(formData.totalVideos),
      })
    );

    // Show success message and reset form
    setSuccess(true);
    setFormData({ title: "", link: "", totalVideos: "" });

    // Navigate to progress page after 2 seconds
    setTimeout(() => {
      navigate("/progress");
    }, 2000);
  };

  // Animation variants
  const formGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    }),
  };

  return (
    <div className="page add-course-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>➕ Add New Course</h1>
        <p className="page-subtitle">Start tracking a new course</p>
      </motion.div>

      <div className="form-container">
        {success && (
          <motion.div
            className="alert alert-success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            ✓ Course added successfully! Redirecting...
          </motion.div>
        )}

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

        <motion.form
          onSubmit={handleSubmit}
          className="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.div
            className="form-group"
            custom={0}
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="title">
              Course Title <span className="required">*</span>
            </label>
            <motion.input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., React.js Fundamentals"
              className="form-input"
              whileFocus={{ scale: 1.02 }}
            />
            <small className="form-hint">
              Enter the name of the course you want to track
            </small>
          </motion.div>

          <motion.div
            className="form-group"
            custom={1}
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="link">Course Link</label>
            <motion.input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://youtube.com/playlist?list=..."
              className="form-input"
              whileFocus={{ scale: 1.02 }}
            />
            <small className="form-hint">
              Optional: YouTube playlist, course website, or any relevant link
            </small>
          </motion.div>

          <motion.div
            className="form-group"
            custom={2}
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
          >
            <label htmlFor="totalVideos">
              Total Number of Videos <span className="required">*</span>
            </label>
            <motion.input
              type="number"
              id="totalVideos"
              name="totalVideos"
              value={formData.totalVideos}
              onChange={handleChange}
              placeholder="e.g., 50"
              min="1"
              className="form-input"
              whileFocus={{ scale: 1.02 }}
            />
            <small className="form-hint">
              Total videos/lessons in this course
            </small>
          </motion.div>

          <motion.button
            type="submit"
            className="btn btn-primary btn-large"
            custom={3}
            variants={formGroupVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Course
          </motion.button>
        </motion.form>

        {/* Info Card */}
        <motion.div
          className="info-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3>💡 How It Works</h3>
          <motion.ul
            className="info-list"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.5 },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              Add a course with the title and total number of videos
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              Track your progress by updating watched videos
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              See your overall progress with visual progress bars
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              Get motivational messages as you progress
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              Mark courses as completed and celebrate your achievement!
            </motion.li>
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
}
