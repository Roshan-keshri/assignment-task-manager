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
    <form className="panel form" id="task-form" onSubmit={handleSubmit}>
      <h2>{editTask ? "Edit Task" : "Create Task"}</h2>

      <div className="field">
        <label htmlFor="title">
          Title <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="e.g. Prepare weekly report"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="description">
          Description <span className="required" aria-hidden="true">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="What needs to be done?"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          type="date"
          name="dueDate"
          value={form.dueDate || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editTask ? "Update Task" : "Create Task"}
        </button>

        {editTask && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;