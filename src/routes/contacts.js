const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../middleware/auth');
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// Validation rules for Contact
const validateContact = [
  body('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isString()
    .withMessage('Phone must be a string'),
  body('address')
    .notEmpty()
    .withMessage('Address is required')
    .isString()
    .withMessage('Address must be a string'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Valid date is required (YYYY-MM-DD)'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isString()
    .withMessage('Role must be a string'),
];

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve contacts',
      message: error.message 
    });
  }
});

// GET contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to retrieve contact',
      message: error.message 
    });
  }
});

// POST create new contact (PROTECTED - requires authentication)
router.post('/', ensureAuthenticated, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
  }

  try {
    const newContact = await createContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to create contact',
      message: error.message 
    });
  }
});

// PUT update contact (PROTECTED - requires authentication)
router.put('/:id', ensureAuthenticated, validateContact, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: errors.array() 
    });
  }

  try {
    const updatedContact = await updateContact(req.params.id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update contact',
      message: error.message 
    });
  }
});

// DELETE contact (PROTECTED - requires authentication)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const deletedContact = await deleteContact(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete contact',
      message: error.message 
    });
  }
});

module.exports = router;