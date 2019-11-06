const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const collors = require('colors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to DB
connectDB();

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// Bidy parser
app.use(express.json());

// Bound routes
app.use('/api/v1/bootcamps', bootcamps);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`App is running at ${process.env.NODE_ENV} on port ${PORT}`.cyan.underline.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold);
    // close server and exit process
    server.close(() => process.exit(1));
})
