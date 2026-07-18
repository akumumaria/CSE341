const Contact = require('../models/contact');

// Get all contacts
const getAllContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    throw error;
  }
};

// Get contact by ID
const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    throw error;
  }
};

// Create new contact
const createContact = async (contactData) => {
  try {
    return await Contact.create(contactData);
  } catch (error) {
    throw error;
  }
};

// Update contact
const updateContact = async (id, contactData) => {
  try {
    return await Contact.findByIdAndUpdate(id, contactData, { 
      new: true,
      runValidators: true 
    });
  } catch (error) {
    throw error;
  }
};

// Delete contact
const deleteContact = async (id) => {
  try {
    return await Contact.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};