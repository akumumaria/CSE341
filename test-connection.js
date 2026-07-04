require('dotenv').config();
const { connectToDatabase } = require('./src/database/connect');
const mongoose = require('mongoose');

async function main() {
  try {
    await connectToDatabase();
    console.log('MongoDB connection successful!');
    console.log('Mongoose connection state:', mongoose.connection.readyState); // 1 = connected
  } catch (error) {
    console.error('MongoDB connection test failed:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed.');
  }
}

main();