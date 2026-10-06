import { useEffect, useRef } from "react";
import { StatusBadge, PriorityBadge } from "./Badge";
import { formatDate, formatDateTime } from "../utils/format";

function TaskDetails({ task, onClose }) {
  const closeRef = useRef(null);

  // Move focus into the dialog when it opens.
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Close on Escape and lock page scroll while open.
  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!task) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="task-details-title">
        <div className="modal-header">
          <div>
            <p className="modal-eyebrow">Task details</p>
            <h2 id="task-details-title">{task.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <p className="modal-desc">{task.description}</p>

        <dl className="detail-grid">
          <div>
            <dt>Status</dt>
            <dd><StatusBadge status={task.status} /></dd>
          </div>
          <div>
            <dt>Priority</dt>
            <dd><PriorityBadge priority={task.priority} /></dd>
          </div>
          <div>
            <dt>Due date</dt>
            <dd>{formatDate(task.dueDate)}</dd>
          </div>
          <div>
            <dt>Created</dt>
            <dd>{formatDateTime(task.createdAt)}</dd>
          </div>
          <div>
            <dt>Last updated</dt>
            <dd>{formatDateTime(task.updatedAt)}</dd>
          </div>
        </dl>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
