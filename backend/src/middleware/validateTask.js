export const validateTask = (req, res, next) => {
  const { title, description, status, priority } = req.body;

  if (!title?.trim() || !description?.trim()) {
    return res.status(400).json({
      message: "Title and description are required",
    });
  }

  if (status && !["pending", "in_progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (priority && !["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ message: "Invalid priority" });
  }

  next();
};