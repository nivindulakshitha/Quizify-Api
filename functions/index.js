import { set, connect } from 'mongoose';
import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';
import userRouter from './Routes/UserRoutes.js';
import helmet from 'helmet';

config();

const api = express();
api.use(json());
api.use(cors());
api.use(helmet());

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

// Express route to register a new user
api.use('/api/user', userRouter);

// Set the connection to the database
const databaseConnector = async (res) => {
    try {
        await connect(process.env.CONNECTION_URI, { dbName: process.env.DATABASE_NAME });
        console.log("Connected to the database.");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// Root route for testing server connectivity
api.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Successfully connected to the server."
    });
});

// Express API implementation for testing DB connectivity
api.get("/api", async (req, res) => {
    const databaseConnection = await databaseConnector(res);

    if (databaseConnection) {
        res.status(200).json({
            success: true,
            message: "Connected to the database."
        });
    } else {
        res.status(500).json({
            success: false,
            message: "Failed to connect to the database."
        });
    }
});

// Use the correct path for serverless functions
api.use("/api/user", userRouter);

export const handler = serverless(api);