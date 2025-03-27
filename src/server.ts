// libs
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import http from 'http';

// Routes
import accountRoutes from './routes/accountRoutes.js';

// Middlewares

// Providers

// Utils


class Server {
    public app: express.Application;
    public port: string | undefined;
    private server: http.Server;
    private paths: Record<string, string>;
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3000';

        this.paths = {
            account: '/api/account'
        };

        this.server = http.createServer(this.app);
        this.middlewares();
        this.routes();
    }

    // async systemListeners() {
    //     if(process.env.NODE_ENV === 'production'){
    //         // Compatibilidad con Windows para capturar SIGINT de manera confiable
    //             if (process.platform === "win32") {
    //                 const rl = require("readline").createInterface({
    //                     input: process.stdin,
    //                     output: process.stdout
    //                 });
    
    //                 rl.on("SIGINT", async () => {
                        
    //                     await this.shutdown('Uncaught Exception');
    //                     process.emit("SIGINT");
    //                 });
    //             } else {
    //                 process.on('SIGINT', async () => {
    //                     if(process.env.NODE_ENV === 'production'){
    //                         console.log('SIGINT received (Ctrl+C). Shutting down gracefully...');
    //                         process.exit(0);
    //                     }
    //                 });
    //             }
    //         // Manejar excepciones no capturadas
    //         process.on('uncaughtException', async (err) => {
    //             await this.shutdown('Uncaught Exception', err.message);
    //         });
    
    //         // Manejar promesas rechazadas sin manejar
    //         process.on('unhandledRejection', async (reason: Error) => {
    //             await this.shutdown('Unhandled Rejection', reason.message);
    //         });
    
    //         // Manejar señal SIGTERM (cierre por el sistema)
    //         process.on('SIGTERM', async () => {
    //             console.log('SIGTERM received. Shutting down gracefully...');

    //             process.exit(0); // Cerrar el proceso después del cierre ordenado
    //         });
    //     }
    // }

    private routes() {
        // Register routes
        this.app.use(this.paths.account, accountRoutes);


        // Catch undefined routes
        this.app.use('*', (req: Request, res: Response, next: NextFunction) => {
            res.json({success: false, message: 'Page not found'});
            // next(new AppError({ message: 'Route not found', statusCode: 404 }));
        });

        // Global error handler
        // this.app.use(globalErrorHandler);
    }

    private middlewares() {
        // CORS
        this.app.use(cors());

        // Body parsing
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    public listen() {
        this.server.listen(this.port, () => {
            console.log('Server running on port:', this.port);
        });
    }
}

export default Server;
