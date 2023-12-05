const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.Mongodb_URL, {
  dbName: process.env.dbName,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
