import { deleteTask } from "../services/taskApi";

function TaskCard({ task, onTaskDeleted , onEdit}) {
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
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>

      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskCard;