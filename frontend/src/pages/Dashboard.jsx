import { useEffect, useState } from "react";
import { getTasks } from "../services/taskApi";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Task Manager</h1>

<TaskForm
  editTask={editTask}
  cancelEdit={() => setEditTask(null)}
  onTaskSaved={() => {
    setEditTask(null);
    fetchTasks();
  }}
/>
      {!tasks.length ? (
        <p>No tasks found.</p>
      ) : (
tasks.map((task) => (
tasks.map((task) => (
  <TaskCard
    key={task.id}
    task={task}
    onTaskDeleted={fetchTasks}
    onEdit={setEditTask}
  />
))
))      )}
    </div>
  );
}

export default Dashboard;