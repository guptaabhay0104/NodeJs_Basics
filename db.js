 const mongoose = require('mongoose')
 require('dotenv').config();   

 // Define the MoongoDB connection URL

//  const mongoURL = process.env.MONGODB_URL_LOCAL //Local Database URL
 const mongoURL = process.env.MONGODB_URL //Online Database Hosted URL
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