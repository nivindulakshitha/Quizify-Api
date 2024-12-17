import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import serverless from 'serverless-http';
import userRouter from './Routes/UserRoutes.js';
import quizRouter from './Routes/QuizRoutes.js';
import helmet from 'helmet';
import databaseConnector from './Methods/DatabaseConnectoin.js';

// Load the environment variables
config();

const api = express();
api.use(json());
api.use(cors());
api.use(helmet());

// Set the rotues for the API
api.use('/api/user', userRouter);
api.use('/api/quiz', quizRouter);

// Middleware to connect to the database before processing any request
api.use(async (req, res, next) => {
    if (req.url.includes("/api")) {
        const databaseConnection = await databaseConnector(res);
        if (databaseConnection) {
            next();
        } else {
            res.status(500).json({
                success: false,
                message: "Failed to connect to the database."
            });
        }
    } else {
        next(); // continue if not an API route
    }
});

// Root route for testing server connectivity
api.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Successfully connected to the server."
    });
});

api.get("/api", async (req, res) => {
    const connection = await databaseConnector(res);
    if (connection) {
        res.status(200).json({
            success: true,
            message: "Successfully connected to the API."
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Failed to connect to the API."
        });
    }
});

export const handler = serverless(api);