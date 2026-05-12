const contactModels = require('../models/contacts');
const getAll = async (req, res) => {
  try {
    
    const result = await contactModels.getAllContacts();

    if (result.length > 0) {
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
  } 
};

const getSingle = async (req, res) => {

  try {
    
    const result = await contactModels.getOneContact(req.params.id);

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

    const newClient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Insert into MongoDB
    const result = await contactModels.createContact(newClient);

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
  } 

}

const updateContact = async (req, res) => {

  try {
    
    const { id } = req.params;
    const contactData = {favoriteColor: req.body.favoriteColor};

    const result = contactModels.updateContact(id, contactData);

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

    const { id } = req.params;


    // Delete a contact
    const result = contactModels.deleteContact(id)

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
