import { useState } from 'react';
import { Link } from 'react-router-dom'
import FileUpload from '../components/FileUpload';
import MapView from '../components/MapView';

const Home = () => {
  const [geojsonUrl, setGeojsonUrl] = useState(null);
  const [geojsonData, setGeojsonData] = useState(null);

  return (
    <div className='home-container'>
      <h2 className='text-center'>Geospatial Data Manager</h2>
      <div className="container d-flex justify-content-around">
        <FileUpload setGeoJsonUrl={setGeojsonUrl} setGeoJsonData={setGeojsonData} />
        <div>
        <MapView geoJsonData={geojsonData}/>
        <Link to='/dashboard' target='_blank' rel='noreferrer'>View your Files</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
