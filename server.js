const express = require('express');
const dotenv = require('dotenv');
const http = require('http');

dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is running at ${process.env.NODE_ENV} on port ${PORT}`));