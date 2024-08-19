import UserRegistration from './Routes/UserRegistration.js';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const router = express.Router();
dotenv.config();

// API configuration
const api = express();
api.use(express.json());
api.use(cors());

// express route to register a new use
api.post('/register', UserRegistration)

// express api implementation
api.get("/api", (req, res) => {
    mongoose.connect(process.env.CONNECTION_URI).then(() => {
        res.status(200).json({ "message": "API is responding..." })
    }).catch(error => {
        res.status(400).json({ "message": error })
        console.log(error)
    })
})

api.listen(3000, () => {
    console.log("Server is running...")
})