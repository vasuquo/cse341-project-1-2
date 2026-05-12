const { MongoClient } = require('mongodb');
require('dotenv').config();

const dbName = process.env.DB_NAME;

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);
let db;

const connectDb = async () => {
    try {
       await client.connect();

    db = client.db(dbName);

    console.log('Connected to Database'); 

    } catch (error) {
        console.error(error);
    }
}

const getDb = () => {
    return db;
}

module.exports = { connectDb, getDb }