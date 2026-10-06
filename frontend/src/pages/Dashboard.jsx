import { useEffect, useState } from "react";
import { getTasks } from "../services/taskApi";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");

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

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => status === "all" || task.status === status)
    .filter((task) => priority === "all" || task.priority === priority)
    .sort((a, b) => {
      if (sort === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);

      if (sort === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);

      if (sort === "dueDate")
        return new Date(a.dueDate) - new Date(b.dueDate);

      return 0;
    });

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

      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {!filteredTasks.length ? (
        <p>No tasks found.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskDeleted={fetchTasks}
            onEdit={setEditTask}
            onView={setSelectedTask}
          />
        ))
      )}

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;