import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet'; // Import L from leaflet
import 'leaflet/dist/leaflet.css';

// Helper component to fit bounds to the GeoJSON data
const FitBounds = ({ geoJsonData }) => {
  const map = useMap();

  useEffect(() => {
    if (geoJsonData && geoJsonData.features && geoJsonData.features.length > 0) {
      const geoJsonLayer = L.geoJSON(geoJsonData);
      const bounds = geoJsonLayer.getBounds();
      map.fitBounds(bounds);
    }
  }, [geoJsonData, map]);

  return null;
};

const MapView = ({ geoJsonData }) => {
  console.log('Rendering Map with GeoJSON:', geoJsonData);

  return (
    <MapContainer center={[46.8, 8.33]} zoom={7} scrollWheelZoom={false} style={{ height: '500px', width: '100%', margin: '16px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geoJsonData && (
        <>
          <GeoJSON data={geoJsonData} />
          <FitBounds geoJsonData={geoJsonData} /> {/* Ensure the map fits to the GeoJSON bounds */}
        </>
      )}
    </MapContainer>
  );
};

export default MapView;

FitBounds.propTypes = {
    geoJsonData: PropTypes.object,
};

MapView.propTypes = {
    geoJsonData: PropTypes.object,
};