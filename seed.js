const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connectToDatabase } = require('./src/database/connect');

dotenv.config();

const seedContacts = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!mongoUri || mongoUri.includes('your_mongodb_connection_string_here')) {
    console.log('No valid MongoDB URI found. Skipping seed import.');
    return;
  }

  try {
    await connectToDatabase();
    const Contact = require('./src/controllers/contact').Contact;

    await Contact.deleteMany({});
    const result = await Contact.insertMany([
      {
        firstName: 'Ada',
        lastName: 'Lovelace',
        email: 'ada@example.com',
        favoriteColor: 'Purple',
        birthday: '1815-12-10',
      },
      {
        firstName: 'Grace',
        lastName: 'Hopper',
        email: 'grace@example.com',
        favoriteColor: 'Blue',
        birthday: '1906-12-09',
      },
      {
        firstName: 'Katherine',
        lastName: 'Johnson',
        email: 'katherine@example.com',
        favoriteColor: 'Green',
        birthday: '1918-08-26',
      },
    ]);

    console.log(`Seed data inserted successfully (${result.length} contacts)`);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

seedContacts();
