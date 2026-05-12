const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
const collectionName = process.env.COLLECTION_NAME;
const client = new MongoClient(uri);

const getAll = async (req, res) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const query = {};
    const result = await collection.find(query).toArray();

    if (result) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .send({ message: 'No record found matching that query.'});
      console.log('No record found matching that query.');
    }
  } catch (e) {
    console.error(e);
    res
    .status(500)
    .send({ message: 'Error retrieving contact record' });
  } finally {
    await client.close();
  }
};

const getSingle = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const query = { _id: contactId };
    const result = await collection.find(query).toArray();

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).send({
          message: 'No record found matching that query.',
        });
      console.log('No record found matching that query.');
    }
  } catch (err) {
    res.status(500).send({
          message:
            err.message || 'Error occurred while retrieving contacts.',
        });
    console.error(err);
  } finally {
    await client.close();
  }
};

const newContact = async (req, res) => {
  /*
   Contacts Schema Structure
   {
    firstName: String,
    lastName: String,
    email: String,
    favoriteColor: String,
    birthday: Date
  }
*/

  try {
        // Connect to the MongoDB cluster
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const newClient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Insert into MongoDB
    const result = await collection.insertOne(newClient);

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      clientId: result.insertedId
    });

  } catch (e) {
    console.error(e);
     res.status(500).json({
      success: false,
      message: 'Server error'
    });
  } finally {
    await client.close();
  }

}

const updateContact = async (req, res) => {

  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const { id } = req.params;

    // Update contact
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          favoriteColor: req.body.favoriteColor
        }
      }
    );

    // Check if contact exists
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact updated successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
    
  }
  
}

const deleteContact = async (req, res) => {
  try {
    await client.connect();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    const { id } = req.params;


    // Delete a contact
    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });

    // Check if contact exists
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }

}

module.exports = { getAll, getSingle, newContact, updateContact, deleteContact };
