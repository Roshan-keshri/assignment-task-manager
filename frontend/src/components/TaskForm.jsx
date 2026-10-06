import { useEffect, useState } from "react";
import { createTask, updateTask } from "../services/taskApi";

const emptyForm = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
};

function TaskForm({ onTaskSaved, editTask, cancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setForm(editTask || emptyForm);
  }, [editTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      return alert("Title and description are required");
    }

    try {
      if (editTask) {
        await updateTask(editTask.id, form);
      } else {
        await createTask(form);
      }

      setForm(emptyForm);
      onTaskSaved();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save task");
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editTask ? "Edit Task" : "Create Task"}</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={form.dueDate || ""}
        onChange={handleChange}
      />

      <button type="submit">
        {editTask ? "Update Task" : "Create Task"}
      </button>

      {editTask && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;