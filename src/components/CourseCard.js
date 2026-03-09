import { useState } from "react";
import ProgressBar from "./ProgressBar";

// CourseCard component - displays course information with progress
// Props: course (object), onUpdate (function), onDelete (function)
export default function CourseCard({ course, onUpdate, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [watchedVideos, setWatchedVideos] = useState(course.watchedVideos);

  const progress = (watchedVideos / course.totalVideos) * 100;
  const isComplete = watchedVideos === course.totalVideos;

  const handleSave = () => {
    onUpdate(course.id, watchedVideos);
    setIsExpanded(false);
  };

  return (
    <div className="course-card">
      <div className="course-card-header">
        <div className="course-card-title">
          <h3>{course.title}</h3>
          {isComplete && <span className="badge-complete">✓ Completed</span>}
        </div>
        <button
          className="btn-delete"
          onClick={() => onDelete(course.id)}
          title="Delete course"
        >
          ✕
        </button>
      </div>

      <div className="course-card-content">
        <ProgressBar
          percentage={progress}
          color={isComplete ? "#10b981" : "#3b82f6"}
        />

        <p className="course-info">
          <span className="info-label">Videos watched:</span>
          <span className="info-value">
            {watchedVideos}/{course.totalVideos}
          </span>
        </p>

        {course.link && (
          <a
            href={course.link}
            target="_blank"
            rel="noopener noreferrer"
            className="course-link"
          >
            📎 Open Course
          </a>
        )}

        {!isComplete && (
          <p className="motivational-message">
            {progress === 0 && "🚀 Let's get started!"}
            {progress > 0 && progress < 50 && "💪 Great start! Keep going."}
            {progress >= 50 && progress < 100 && "🔥 You're halfway there!"}
          </p>
        )}
        {isComplete && (
          <p className="motivational-message success">
            🎉 Congratulations! Course completed!
          </p>
        )}
      </div>

      <button className="btn-update" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Close" : "Update Progress"}
      </button>

      {isExpanded && (
        <div className="course-card-expand">
          <label>Watched Videos:</label>
          <input
            type="number"
            min="0"
            max={course.totalVideos}
            value={watchedVideos}
            onChange={(e) =>
              setWatchedVideos(Math.min(e.target.value, course.totalVideos))
            }
            className="input-number"
          />
          <span className="input-hint">Max: {course.totalVideos}</span>
          <button className="btn-save" onClick={handleSave}>
            Save Progress
          </button>
        </div>
      )}
    </div>
  );
}
