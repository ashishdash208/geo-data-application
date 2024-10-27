import { useEffect, useState } from 'react';
import { getUserFiles } from '../services/api';
import MapView from '../components/MapView';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getUserFiles();
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching user files:', error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileClick = (file) => {
    setSelectedFile(file); // Update the selected file
  };

  return (
    <div>
      <h2 className='text-center'>Dashboard</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <div className='container d-flex justify-content-around align-items-center gap-3'>
          <div>
            <h4>Uploaded Files</h4>
          <ul className='uploaded-files-list' style={{ maxHeight: "400px", overflowY: "auto" }}>
            {Array.isArray(files) && files.map(file => (
              <li key={file.id} onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                {file.filename}
              </li>
            ))} 
          </ul>
          </div>
            <div className="map-container">
          {selectedFile ? (
            <>
              <h4 className='text-center'>Showing Map for: {selectedFile.filename}</h4>
              <MapView geoJsonData={selectedFile.geoJsonData} />
            </>
          ) : (
            <>
              <h4 className='text-center'>Select a file to view it on the Map</h4>
              <MapView />
            </>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;