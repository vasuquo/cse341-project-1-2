const { ObjectId } = require('mongodb');
require('dotenv').config();

const { getDb } = require('../database');
const collectionName = process.env.COLLECTION_NAME;

const collection = () => getDb().collection(collectionName);

// Create Contacts
const createContact = async  (contactData) => {
  return await collection().insertOne(contactData);
}

// Update Contacts
const updateContact = async (id, contactData) => {
  return await collection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        favoriteColor: contactData.favoriteColor,
      }
    }
  );
}

// Delete Contact
const deleteContact = async (id) => {
  return await collection().deleteOne({
    _id: new ObjectId(id)
  });
}

// Get all contacts
const getAllContacts = async (query) => {
    return await collection().find({query}).toArray();
}

// Get a single contact
const getOneContact = async (id) => {    
    return await collection().find({_id: new ObjectId(id)}).toArray();
}

module.exports = { createContact, updateContact, deleteContact, getAllContacts, getOneContact }