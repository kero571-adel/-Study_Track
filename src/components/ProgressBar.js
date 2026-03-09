import { motion } from "framer-motion";

// ProgressBar component - displays a visual progress indicator with smooth animations
// Props: percentage (0-100), color (optional)
export default function ProgressBar({ percentage = 0, color = "#667eea" }) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-bar-background">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${safePercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            backgroundColor: color,
          }}
        />
      </div>
      <motion.span
        className="progress-bar-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {Math.round(safePercentage)}%
      </motion.span>
    </div>
  );
}
