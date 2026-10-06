let tasks = [];

export const getAllTasks = () => {
  return tasks;
};

export const getTaskById = (id) => {
  return tasks.find((task) => task.id === id);
};

export const createTask = (data) => {
const task = {
  id: Date.now().toString(),
  status: "pending",
  priority: "medium",
  ...data,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
tasks.push(task);
return task;
};

export const updateTask = (id, data) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  tasks[index] = {
    ...tasks[index],
    ...data,
    id,
    updatedAt: new Date().toISOString(),
  };

  return tasks[index];
};

export const deleteTask = (id) => {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  return tasks.splice(index, 1)[0];
};