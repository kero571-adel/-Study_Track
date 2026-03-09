// TaskItem component - displays a single task with completion and delete options
// Props: task (object), onToggle (function), onDelete (function)
export default function TaskItem({ task, onToggle, onDelete }) {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Check if task is overdue
  const isOverdue = !task.completed && new Date(task.date) < new Date();

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      <div className="task-item-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <div className="task-info">
          <h4 className="task-title">{task.title}</h4>
          <p className="task-date">
            📅 {formatDate(task.date)}
            {isOverdue && <span className="overdue-label"> - Overdue!</span>}
          </p>
        </div>
      </div>
      <button
        className="btn-delete-task"
        onClick={() => onDelete(task.id)}
        title="Delete task"
      >
        ✕
      </button>
    </div>
  );
}
