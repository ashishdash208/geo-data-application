import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import FileUploadIcon from '../assets/icons/file-upload-icon.svg'

const FileUpload = ({ setGeoJsonUrl, setGeoJsonData }) => {
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
      if (data.geoJsonData) {
        // Directly set the GeoJSON data if the response contains converted data (from KML)
        setGeoJsonUrl(null);  // set URL to null to make sure it doesn't change and trigger the useEffect
        setGeoJsonData(data.geoJsonData);  // Pass the GeoJSON data directly to the map
      } else if (data.filePath) {
        // If it's a GeoJSON file, use the URL to fetch the data
        const fileUrl = `http://localhost:5000${data.filePath}`;
        setGeoJsonUrl(fileUrl);
      }
    } catch (error) {
      setMessage('Error uploading file:', error);
    }
  };

  return (
    <div className='my-3'>
      <h2>Upload GeoJSON or KML File</h2>
      <div className="text-center my-3">
        <div className="file-upload-container mx-auto" onClick={ () => document.getElementById('file-upload-input').click() }>
          <img src={FileUploadIcon} alt='Upload Icon' className='icon-size-m' />
          {file ? 
          <>
          <div>{file.name}</div>
          </> : 
          <>
          <div>Upload a GeoJson or KML File</div>
          <div>Max File Size: 2 Mb</div>
          </>
          }
          <input id='file-upload-input' type="file" onChange={handleFileChange} accept=".geojson, .kml" className='d-none' />
        </div>
        {message && <p>{message}</p>}
        <button type="submit" onClick={handleSubmit} className='custom-button my-3'>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;

FileUpload.propTypes = {
  setGeoJsonUrl: PropTypes.func,
  setGeoJsonData: PropTypes.func
}