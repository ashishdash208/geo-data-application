const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const { verifyToken } = require('../middleware/auth')

// Route for file uploads
router.post('/upload', verifyToken, fileController.uploadFile);
router.get('/get-user-files', verifyToken, fileController.getUserFiles);

module.exports = router;