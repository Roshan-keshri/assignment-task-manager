import { deleteTask } from "../services/taskApi";
import { StatusBadge, PriorityBadge } from "./Badge";
import { formatDate } from "../utils/format";

function TaskCard({ task, onTaskDeleted, onEdit, onView }) {
  const handleDelete = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteTask(task.id);
      onTaskDeleted();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <article className="card">
      <div className="badges">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
      </div>

      <h3 className="card-title">{task.title}</h3>
      <p className="card-desc">{task.description}</p>

      <dl className="card-meta">
        <div>
          <dt>Created</dt>
          <dd>{formatDate(task.createdAt)}</dd>
        </div>
        {task.dueDate && (
          <div>
            <dt>Due</dt>
            <dd>{formatDate(task.dueDate)}</dd>
          </div>
        )}
      </dl>

      <div className="card-actions">
        <button className="btn btn-secondary" onClick={() => onView(task)}>View</button>
        <button className="btn btn-secondary" onClick={() => onEdit(task)}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </article>
  );
}

export default TaskCard;
