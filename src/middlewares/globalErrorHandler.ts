import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const isOperational = err.isOperational || false;

  const errorResponse = {
    success: false,
    message: isOperational ? err.message : "Something went wrong!",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  res.status(statusCode).json(errorResponse);
};
