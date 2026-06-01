const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env'), quiet: true });

const connectDB = async()=>{
    const DATABASE_URL = process.env.DATABASE_URL;
    if(!DATABASE_URL){
        const error = new Error('DATABASE_URL is not defined in .env file');
        throw error;
    }
    try{
        await mongoose.connect(DATABASE_URL, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('Database connected successfully');
    }catch(err){
        throw new Error(`Error connecting to database: ${err.message}`);
    }
}

module.exports = connectDB;
