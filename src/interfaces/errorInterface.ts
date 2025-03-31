export interface IAppError {
  message: string;
  statusCode: number;
  isOperational?: boolean;
  data?: any;
}

export interface IUnhandledError {
  message: string;
  stack: string;
  context?: string;
}
