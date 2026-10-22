import { Request, Response } from "express";
import { pool } from "../config/database.js";

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    const query = `
            INSERT INTO tasks (title, description)
            VALUES ($1, $2)
            RETURNING *;
        `;
    const result = await pool.query(query, [title, description]);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro creating task: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const { search } = req.query;

  try {
    let query = "SELECT * FROM tasks";
    const queryParams: string[] = [];

    if (search && typeof search === "string") {
      query += " WHERE title ILIKE $1 OR description ILIKE $1";
      queryParams.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC;";
    const result = await pool.query(query, queryParams);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const currentTask = res.locals.task;

  const updatedTitle = title !== undefined ? title : currentTask.title;
  const updatedDescription =
    description !== undefined ? description : currentTask.description;

  try {
    const query = `
      UPDATE tasks
      SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *;
    `;
    const result = await pool.query(query, [
      updatedTitle,
      updatedDescription,
      id,
    ]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    return res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleTaskComplete = async (req: Request, res: Response) => {
  const { id } = req.params;
  const currentTask = res.locals.task;

  const newCompletedAt = currentTask.completed_at ? null : new Date();

  try {
    const query = `
      UPDATE tasks
      SET completed_at = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [newCompletedAt, id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error toggling task status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
