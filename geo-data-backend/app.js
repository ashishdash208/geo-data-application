const express = require('express');
const fileRoutes = require('./routes/fileRoutes');
const authRoutes = require('./routes/authRoutes')
const path = require('path');
const cors = require('cors');
const fs = require('node:fs')
require('dotenv').config();
const mysql = require('mysql2');

const app = express();

// Home end-point
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

// Middleware for serving static files (uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Use file routes
app.use('/files', fileRoutes);
app.use('/auth', authRoutes);

module.exports = app;