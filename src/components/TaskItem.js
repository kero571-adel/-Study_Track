// components/TaskItem.js
export default function TaskItem({ task, onToggle, onDelete, isOverdue }) {
  // ✅ دالة تنسيق التاريخ - تدعم النصوص والتواريخ القديمة
  const formatDate = (dateString) => {
    if (!dateString) return "No date";

    // لو التاريخ مخزن كنص "2024-04-08"
    if (typeof dateString === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const [year, month, day] = dateString.split("-");
      const date = new Date(year, month - 1, day); // شهر يبدأ من 0
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }

    // fallback للتواريخ القديمة أو Timestamps
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  // ✅ دالة عرض التواريخ - تدعم جميع التنسيقات
  const renderDateDisplay = () => {
    // نطاق التواريخ (الجديد)
    if (task.startDate && task.endDate) {
      const start = formatDate(task.startDate);
      const end = formatDate(task.endDate);
      return (
        <>
          📅 <span style={{ fontWeight: 500 }}>{start} → {end}</span>
        </>
      );
    }
    
    // تاريخ واحد (جديد أو قديم)
    const date = task.endDate || task.dueDate || task.date;
    if (date) return <>📅 {formatDate(date)}</>;
    
    return <span style={{ color: "#999" }}>No date set</span>;
  };

  // ✅ إزالة الحساب المحلي لـ isOverdue - نستخدم الـ prop مباشرة
  // (لأنه بيتم حسابه في Tasks.js بشكل موحد)

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${isOverdue ? "overdue" : ""}`}
      // ✅ خلفية حمراء واضحة للمهام المتأخرة
      style={
        isOverdue
          ? {
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              borderLeft: "4px solid #ef4444",
              borderRadius: "8px",
              padding: "10px 12px",
              boxShadow: "0 2px 8px rgba(239, 68, 68, 0.15)",
              animation: "pulse-red 2s infinite",
            }
          : {}
      }
    >
      {/* ✅ أنيميشن الخلفية الحمراء */}
      <style>{`
        @keyframes pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.2); }
          50% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        }
      `}</style>

      <div className="task-item-content" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
          style={{ width: "20px", height: "20px", cursor: "pointer" }}
        />

        <div className="task-info" style={{ flex: 1, minWidth: 0 }}>
          <h4
            className="task-title"
            style={{
              margin: "0 0 4px 0",
              fontSize: "15px",
              fontWeight: task.completed ? "400" : "600",
              color: task.completed ? "#999" : "#333",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h4>

          <p
            className="task-date"
            style={{
              margin: 0,
              fontSize: "13px",
              color: isOverdue ? "#ef4444" : "#666",
              fontWeight: isOverdue ? "500" : "400",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {renderDateDisplay()}
            {/* ✅ إضافة علامة التأخير */}
            {isOverdue && (
              <span 
                className="overdue-label"
                style={{ 
                  background: "#ef4444", 
                  color: "white", 
                  padding: "2px 8px", 
                  borderRadius: "4px", 
                  fontSize: "11px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                }}
              >
                ⚠ Overdue
              </span>
            )}
          </p>

          {/* ✅ شريط تقدم للمهام ذات النطاق */}
          {task.startDate && task.endDate && !task.completed && (
            <div style={{ marginTop: "8px" }}>
              <div style={{ height: "4px", background: "#eee", borderRadius: "2px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${Math.min(100, Math.max(0, 
                      ((new Date() - new Date(task.startDate)) / 
                      (new Date(task.endDate) - new Date(task.startDate))) * 100
                    ))}%`,
                    background: isOverdue ? "#ef4444" : "#3b82f6",
                    transition: "width 0.3s ease",
                    borderRadius: "2px",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        className="btn-delete-task"
        onClick={() => onDelete(task.id)}
        title="Delete task"
        style={{
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "4px",
          color: isOverdue ? "#ef4444" : "#999",
          transition: "all 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseOut={(e) => (e.currentTarget.style.color = isOverdue ? "#ef4444" : "#999")}
      >
        ✕
      </button>
    </div>
  );
}