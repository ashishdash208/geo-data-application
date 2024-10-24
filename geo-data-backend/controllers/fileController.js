const multer = require('multer');
const path = require('path');
const fs = require('fs');
const tj = require('@tmcw/togeojson');
const DOMParser = require("xmldom").DOMParser;

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
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
    const fileExtension = path.extname(req.file.filename).toLowerCase();

    // If the file is KML, convert it to GeoJSON
    if (fileExtension === '.kml') {
      const kml = new DOMParser().parseFromString(fs.readFileSync(filePath, 'utf8'));
      const geoJsonData = tj.kml(kml);

      // Respond with the converted GeoJSON data directly
      return res.json({
        message: 'KML file uploaded and converted to GeoJSON successfully',
        geoJsonData,
      });
    } else if (fileExtension === '.geojson') {
      // If the file is already in GeoJSON format, return the file path
      return res.json({
        message: 'GeoJSON file uploaded successfully',
        filePath: `/uploads/${req.file.filename}`,
      });
    }
  });
};
