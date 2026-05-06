const {MongoClient, ObjectId} = require('mongodb')
require('dotenv').config()
const uri = process.env.MONGODB_URL
const dbName = process.env.DB_NAME
const collectionName = process.env.COLLECTION_NAME
const client = new MongoClient(uri)

const getAll = async (req, res) => {
    try {
        // Connect to the MongoDB cluster
        await client.connect()
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = {};
        const result = await collection.find(query).toArray();

        if (result) {
            res.status(200).json(result);
        } else {
            console.log("No record found matching that query.");
        }
        
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    try {
        // Connect to the MongoDB cluster
        await client.connect()
        const database = client.db(dbName);
        const collection = database.collection(collectionName);
        const query = {_id: contactId};
        const result = await collection.find(query).toArray();

        if (result) {
            res.status(200).json(result[0]);
        } else {
            console.log("No record found matching that query.");
        }
        
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }

}

module.exports = { getAll, getSingle }   

