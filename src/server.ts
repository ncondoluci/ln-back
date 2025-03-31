import cors from "cors";
import http from "http";
// libs
import express, { Request, Response, NextFunction } from "express";

// Routes
import accountRoutes from "./routes/accountRoutes.js";

// Middlewares
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

// Utils
import { AppError } from "./utils/appError.js";

class Server {
  public app: express.Application;
  public port: string | undefined;
  private server: http.Server;
  private paths: Record<string, string>;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.paths = {
      account: "/api/account",
    };

    this.systemListeners();
    this.middlewares();
    this.routes();
    this.server = http.createServer(this.app);
  }

  private systemListeners() {
    // Manejar excepciones no capturadas
    process.on("uncaughtException", async (err) => {
      console.error("Uncaught Exception:", err);
      // Podríamos enviar un mail a los administradores con un mailService
    });

    // Manejar promesas rechazadas sin manejar
    process.on("unhandledRejection", async (reason: Error) => {
      console.error("Unhandled Rejection:", reason);
      // Podríamos enviar un mail a los administradores con un mailService
    });

    // Manejar señal SIGTERM (cierre por el sistema)
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received. Shutting down gracefully...");

      process.exit(0); // Cerrar el proceso después del cierre ordenado
    });
  }

  private routes() {
    // Register routes
    this.app.use(this.paths.account, accountRoutes);

    // Catch undefined routes
    this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
      next(new AppError({ message: "Route not found", statusCode: 404 }));
    });

    // Global error handler
    this.app.use(globalErrorHandler);
  }

  private middlewares() {
    // CORS
    this.app.use(cors());

    // Body parsing
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }

  public listen() {
    this.server.listen(this.port, () => {
      console.log("Server running on port:", this.port);
    });
  }
}

export default Server;
