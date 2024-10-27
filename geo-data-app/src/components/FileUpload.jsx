import { useState } from 'react';
import PropTypes from 'prop-types';
import FileUploadIcon from '../assets/icons/file-upload-icon.svg'
import { uploadFile } from '../services/api';

const FileUpload = ({ setGeoJsonUrl, setGeoJsonData }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setFile(event.dataTransfer.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    if (file.size > 500000) {
      setMessage('File Size is too big. Max Size is 5 Mb.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await uploadFile(formData); // Make sure this is an async call
      const data = response.data;
      setMessage(data.message || 'File uploaded successfully');
  
      if (data.geoJsonData) {
        // Directly set the GeoJSON data if the response contains converted data (from KML)
        setGeoJsonData(data.geoJsonData);  // Pass the GeoJSON data directly to the map
        setGeoJsonUrl(null);  // No need for a URL fetch since we have the data
      } else if (data.filePath) {
        // If it's a GeoJSON file, use the URL to fetch the data
        const fileUrl = `http://localhost:5000${data.filePath}`;
        setGeoJsonUrl(fileUrl);
      }
    } catch (error) {
      setMessage('Error uploading file: ' + error.message); // Concatenate error message
    }
  };
  

  return (
    <div className='my-3'>
      <h2>Upload GeoJSON or KML File</h2>
      <div className="text-center my-3" onDragOver={(event) => event.preventDefault()} onDrop={handleFileDrop}>
        <div className="file-upload-container mx-auto" onClick={ () => document.getElementById('file-upload-input').click() }>
          <img src={FileUploadIcon} alt='Upload Icon' className='icon-size-m' />
          {file ? 
          <>
          <div>{file.name}</div>
          </> : 
          <>
          <div>Upload a GeoJson or KML File</div>
          <div>Max File Size: 5 Mb</div>
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