import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
mongoose.set('debug', true)

// import routes from Routes
import userRouter from './Routes/UserRoutes.js';

const router = express.Router();
dotenv.config();

// API configuration
const api = express();
api.use(express.json());
api.use(cors());
api.use(async (req, res, next) => {
    if (req.url.includes("/api")) {
        const databaseConnection = await databaseConnector(res)
        if (databaseConnection) {
            next()
        } else {
            res.status(406).json({
                success: false,
                message: "Failed to connect to the database."
            })
        }
    }
})

// express route to register a new use
api.use('/api/user/', userRouter)

// srt the connection to the database
const databaseConnector = async (res) => {
    try {
        await mongoose.connect(process.env.CONNECTION_URI, { dbName: process.env.DATABASE_NAME })
        console.log("Connected to the database.")
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

// express API implementation
api.get("/api", async (req, res) => {
    const databaseConnection = await databaseConnector(res)

    if (databaseConnection) {
        res.status(200).json({
            success: true,
            message: "Connected to the database."
        })
    } else {
        res.status(406).json({
            success: false,
            message: "Failed to connect to the database."
        })
    }
})

api.listen(3000, () => {
    console.log("Server is running...")
})