import { Request, Response, NextFunction } from "express";
import { pool } from "../config/database.js";

export const validateTaskBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a non-empty string." });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    return res.status(400).json({
      error: "Description is required and must be a non-empty string.",
    });
  }

  return next();
};

export const validateTaskUpdateBody = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({
      error:
        "At least one field (title ou description) must be provided for update.",
    });
  }

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({ error: "Title must be a non-empty string." });
  }

  if (
    description !== undefined &&
    (typeof description !== "string" || description.trim() === "")
  ) {
    return res
      .status(400)
      .json({ error: "Description must be a non-empty string." });
  }

  return next();
};

export const validateTaskExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  try {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found." });
    }

    res.locals.task = result.rows[0];
    return next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid task ID format." });
  }
};
