function TaskDetails({ task, onClose }) {
  if (!task) return null;

  return (
    <div>
      <h2>Task Details</h2>

      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.dueDate || "Not set"}</p>
      <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
      <p>Updated: {new Date(task.updatedAt).toLocaleString()}</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default TaskDetails;