import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { initDatabase } from "./config/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "Server is running perfectly! " });
});

app.listen(port, async () => {
  await initDatabase();
  console.log(`Server is running on http://localhost:${port}`);
});
