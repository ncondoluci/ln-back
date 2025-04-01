import { IAppError } from "../interfaces/errorInterface.js";

class AppError extends Error implements IAppError {
  public statusCode: number;
  public isOperational: boolean;
  public data?: any;

  constructor({ message, statusCode, isOperational = true, data }: IAppError) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

export { AppError };
