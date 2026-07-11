const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  favoriteColor: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

// Get all contacts
const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw error;
  }
};

// Get a single contact by ID
const getContactById = async (id) => {
  try {
    const contact = await Contact.findById(id);
    return contact;
  } catch (error) {
    throw error;
  }
};

// Create a new contact
const createContact = async (contactData) => {
  try {
    const newContact = await Contact.create(contactData);
    return newContact;
  } catch (error) {
    throw error;
  }
};

// Update a contact by ID
const updateContact = async (id, contactData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, contactData, { new: true });
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

// Delete a contact by ID
const deleteContact = async (id) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = { Contact, getAllContacts, getContactById, createContact, updateContact, deleteContact };
