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
        setFiles(response.data);
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
      <h2>Your Uploaded Files</h2>
      {files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <div>
          <ul>
            {Array.isArray(files) && files.map(file => (
              <li key={file.id} onClick={() => handleFileClick(file)} style={{ cursor: 'pointer' }}>
                {file.filename}
              </li>
            ))}
          </ul>
          {selectedFile && (
            <div>
              <h3>Showing Map for: {selectedFile.filename}</h3>
              <MapView geoJsonData={selectedFile.geoJsonData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;