import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskComplete,
  updateTask,
} from "../controllers/taskController.js";
import {
  validateTaskBody,
  validateTaskExists,
  validateTaskUpdateBody,
} from "../middlewares/taskValidation.js";

const router = Router();

router.post("/tasks", validateTaskBody, createTask);
router.get("/tasks", getTasks);
router.put(
  "/tasks/:id",
  validateTaskExists,
  validateTaskUpdateBody,
  updateTask,
);
router.delete("/tasks/:id", validateTaskExists, deleteTask);
router.patch("/tasks/:id/complete", validateTaskExists, toggleTaskComplete);

export default router;
