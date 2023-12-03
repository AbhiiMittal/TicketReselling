const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/booking', {
  dbName: 'booking',
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

// Gracefully close the Mongoose connection on application termination
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

// Additional logging for when the application is terminated
process.on('SIGTERM', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination (SIGTERM)');
    process.exit(0);
  });
});
