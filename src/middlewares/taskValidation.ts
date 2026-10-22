import { Request, Response, NextFunction } from "express";

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
    return res
      .status(400)
      .json({
        error: "Description is required and must be a non-empty string.",
      });
  }

  return next();
};
