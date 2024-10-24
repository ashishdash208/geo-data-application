import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import MapView from '../components/MapView';

const Home = () => {
  const [geojsonUrl, setGeojsonUrl] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    if (geojsonUrl) {
      fetch(geojsonUrl)
        .then((res) => res.json())
        .then((data) => {
          setGeojsonData(data); // Store the fetched GeoJSON data
        })
        .catch((err) => {
          console.error('Error fetching GeoJSON data:', err);
        });
    }
  }, [geojsonUrl]);

  return (
    <div className='home-container'>
      <h2 className='text-center'>Geospatial Data Manager</h2>
      <div className="container d-flex flex-column align-items-center">
        <FileUpload setGeoJsonUrl={setGeojsonUrl}/>
        <MapView geoJsonData={geojsonData}/>
      </div>
    </div>
  );
};

export default Home;
