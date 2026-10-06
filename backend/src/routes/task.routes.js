import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import { validateTask } from "../middleware/validateTask.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;