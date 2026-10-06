import { useEffect, useState } from "react";
import { getTasks } from "../services/taskApi";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import ThemeToggle from "../components/ThemeToggle";

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

  const handleRetry = () => {
    setError("");
    setLoading(true);
    fetchTasks();
  };

  // Load the task into the form and make sure the form is visible (matters on mobile).
  const handleEdit = (task) => {
    setEditTask(task);
    document.getElementById("task-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

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

  if (sort === "priorityHigh") {
    const order = { high: 3, medium: 2, low: 1 };
    return order[b.priority] - order[a.priority];
  }

  if (sort === "priorityLow") {
    const order = { high: 3, medium: 2, low: 1 };
    return order[a.priority] - order[b.priority];
  }

  return 0;
});

  // Summary numbers are derived from the tasks array - no extra API calls.
  const stats = [
    { label: "Total Tasks", value: tasks.length },
    { label: "Pending", value: tasks.filter((t) => t.status === "pending").length },
    { label: "In Progress", value: tasks.filter((t) => t.status === "in_progress").length },
    { label: "Completed", value: tasks.filter((t) => t.status === "completed").length },
  ];

  const renderTasks = () => {
    if (!tasks.length) {
      return (
        <div className="state-box">
          <h3>No tasks yet</h3>
          <p>Create your first task to get started.</p>
        </div>
      );
    }

    if (!filteredTasks.length) {
      return (
        <div className="state-box">
          <h3>No matching tasks</h3>
          <p>Try changing your search or filters.</p>
        </div>
      );
    }

    return (
      <>
        <p className="result-count">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onTaskDeleted={fetchTasks}
              onEdit={handleEdit}
              onView={setSelectedTask}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Task Manager</h1>
          <p>Organize your work and stay productive</p>
        </div>
        <ThemeToggle />
      </header>

      {loading ? (
        <div className="state-box" role="status">
          <div className="spinner" aria-hidden="true" />
          <p>Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="state-box state-error" role="alert">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={handleRetry}>Retry</button>
        </div>
      ) : (
        <>
          <section className="stats" aria-label="Task summary">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </section>

          <div className="layout">
            <TaskForm
              editTask={editTask}
              cancelEdit={() => setEditTask(null)}
              onTaskSaved={() => {
                setEditTask(null);
                fetchTasks();
              }}
            />

            <main className="tasks">
              <div className="toolbar">
                <div className="search">
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M9 15A6 6 0 109 3a6 6 0 000 12zm5-1l4 4" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    aria-label="Search tasks"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <select aria-label="Filter by priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select aria-label="Sort tasks" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priorityHigh">Priority: High to Low</option>
                  <option value="priorityLow">Priority: Low to High</option>
                </select>
              </div>

              {renderTasks()}
            </main>
          </div>
        </>
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
