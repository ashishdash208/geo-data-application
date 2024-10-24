import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

const FileUpload = ({ setGeoJsonUrl }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = response.data;
      setMessage(data.message || 'File uploaded successfully');
      const fileUrl = `http://localhost:5000${data.filePath}`;
      console.log('File URL:', fileUrl);  // Added logging for debugging
      setGeoJsonUrl(fileUrl);
    } catch (error) {
      setMessage('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload GeoJSON or KML File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".geojson, .kml" />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  setGeoJsonUrl: PropTypes.func
}