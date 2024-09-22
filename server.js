const express = require('express');
const dotenv = require('dotenv').config();
const errorhandler = require('./middleware/errorhandler');
const connectDb = require('./config/DBConnection');

const port = process.env.PORT || 5000;

// Connect to the database
connectDb()
  .then(() => {
    const app = express();

    // Middleware
    app.use(express.json());

    // Routes
    app.use("/api/contacts", require('./routes/contactRoutes'));

    // Error handling middleware
    app.use(errorhandler);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error: ", err.message);
    process.exit(1);
  });
