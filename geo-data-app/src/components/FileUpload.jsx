import { useState } from 'react';

const FileUpload = () => {
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
      const response = await fetch('http://localhost:5000/files/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setMessage(data.message || 'File uploaded successfully');
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