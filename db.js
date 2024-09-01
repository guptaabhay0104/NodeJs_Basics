 const mongoose = require('mongoose')   

 // Define the MoongoDB connection URL

 const mongoURL = 'mongodb://localhost:27017/hotels'
 mongoose.connect(mongoURL)

 // Get the default connection
 // Mongoose maintains a default connection object representing the MongoDB connection.
 const db = mongoose.connection;

 // Define event listeners for database connection

 db.on('connected', () => console.log('Connected to MongoDB server'))
 db.on('error', (err) => console.log('MongoDB connection eroor:', err))
 db.on('disconnected', () => console.log('MongoDB Disconnected'))

 // Export the database connection

 module.exports = {
  db
 }