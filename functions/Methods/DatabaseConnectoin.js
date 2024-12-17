import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

// Set the connection to the database
const databaseConnector = async (res) => {
    try {
        await connect(process.env.CONNECTION_URI, { 
            dbName: process.env.DATABASE_NAME
         });
        console.log("Connected to the database.");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default databaseConnector;