const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tj = require('@tmcw/togeojson');
const DOMParser = require("xmldom").DOMParser;
const db = require('../models');  // Import Sequelize models

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null,path.parse(file.originalname).name+'-'+Date.now() + path.extname(file.originalname));
  },
});

// File type validation (GeoJSON and KML)
const fileFilter = (req, file, cb) => {
  const fileTypes = /geojson|kml/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    // Allow if the extension is correct, ignoring mimetype for now
    cb(null, true);
  } else {
    cb(new Error('Only .geojson and .kml files are allowed!'));
  }
};


// Initialize Multer middleware
const upload = multer({ storage, fileFilter }).single('file');

// Controller to handle file upload
exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }

      // The filename will now be located in the uploads folder as defined in your storage configuration
      const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
      const fileExtension = path.extname(req.file.filename).toLowerCase();
      const userId = req.user.id; // Get the userId from the JWT middleware
      console.log('userId:', userId);

      try {
          let geoJsonData = null;

          // Check if the uploaded file actually exists
          if (fs.existsSync(filePath)) {
              // If the file is KML, convert it to GeoJSON
              if (fileExtension === '.kml') {
                  const kml = new DOMParser().parseFromString(fs.readFileSync(filePath, 'utf8'));
                  geoJsonData = tj.kml(kml);
              } else if (fileExtension === '.geojson') {
                  // If the file is already in GeoJSON format, read the GeoJSON data
                  geoJsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
              }

              // Save file info, userId, and GeoJSON data in the database
              const geoFile = await db.GeoFile.create({
                  filename: req.file.originalname,
                  filePath: `/uploads/${req.file.filename}`,
                  geoJsonData: geoJsonData,
                  UserId: userId,  // Link the file to the logged-in user
              });

              console.log('geoFile:', geoFile);
              res.json({
                  message: fileExtension === '.kml' 
                      ? 'KML file uploaded and converted to GeoJSON successfully' 
                      : 'GeoJSON file uploaded successfully',
                  geoJsonData: geoFile.geoJsonData, // Return the GeoJSON data
              });
          } else {
              return res.status(500).json({ error: 'Uploaded file not found after upload' });
          }
      } catch (error) {
          res.status(500).json({ error: `Error processing file: ${error}` });
      }
  });
};

exports.getUserFiles = (req, res) => {
  try {
    const userId = req.user.id;
    console.log('userId:', userId);
    const userFiles = db.GeoFile.findAll({ where: {userId} })
    res.status(200).json({ statusCode: 200, message: 'Files Found!', files: Array.isArray(userFiles) ? userFiles : [] });
  } catch(error) {
    res.status(500).json({ message: `Error fetching Files: ${error}` });
  }
} 
