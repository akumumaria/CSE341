const mongoose = require('mongoose');

// Contact Schema with 7 required fields
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
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
