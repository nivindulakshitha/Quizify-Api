import UserRegistration from './Routes/UserRegistration.cjs';

const express = require('express');
const router = express.Router();
require('dotenv').config();
const cors = require('cors');

// API configuration
const api = express();
api.use(express.json());
api.use(cors());

// express route to register a new user
api.post('/register', UserRegistration)

// express api implementation
api.listen(3000, () => {
    console.log('Server is running on port 3000');
});