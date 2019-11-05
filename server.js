const express = require('express');
const dotenv = require('dotenv');
const http = require('http');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load env vars
dotenv.config({path: './config/config.env'});

const app = express();

// Bound routes
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is running at ${process.env.NODE_ENV} on port ${PORT}`));