import * as taskService from "../services/task.service.js";

export const getTasks = (req, res) => {
  const tasks = taskService.getAllTasks();
  res.status(200).json(tasks);
};

export const getTask = (req, res) => {
  const task = taskService.getTaskById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
};

export const createTask = (req, res) => {
  const task = taskService.createTask(req.body);
  res.status(201).json(task);
};

export const updateTask = (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
};

export const deleteTask = (req, res) => {
  const task = taskService.deleteTask(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ message: "Task deleted successfully" });
};