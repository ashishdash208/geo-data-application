import FileUpload from '../components/FileUpload';
import MapView from '../components/MapView';

const Home = () => {
  return (
    <div className='home-container'>
      <h2>Geospatial Data Manager</h2>
      <FileUpload />
      <MapView />
    </div>
  );
};

export default Home;
