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
