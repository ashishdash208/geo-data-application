const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const path = require('path');
const cors = require('cors')

const app = express();

// Home end-point
app.use(cors())
app.use(express.json())

// Middleware for serving static files (uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use file routes
app.use('/files', fileRoutes);

module.exports = app;